const URL_LOGIN = "http://localhost:6060/authorized"


// HANDLE EMPTY AFTER REGISTER
const emptyRegister = () => {
    document.getElementById('regUsername').value = null
    document.getElementById('regFullname').value = null
    document.getElementById('regAddress').value = null
    document.getElementById('regAge').value = null
    document.getElementById('regHobby').value = null
}


// HANDLE MOVE TO OTHER
const listData = () => {
    window.location.href = `http://localhost:6060/listData`
}

const dashboard = () => {
    window.location.href = `http://localhost:6060/dashboard`
}

const home = () => {
    window.location.href = `http://localhost:6060/home`
}


// HANDLE DELETE USER BY ID
const handleDelete = async (dataId) => {
    let ans = confirm('SURE TO DELETE ?')
    if (ans){
      await fetch(`http://localhost:6060/data/${dataId}`, {
        method: 'DELETE'
      })
      location.reload()
    }

  }


// HANDLE DELETE GAME HISTORY BY ID
const handleDeleteH = async (historyId) => {
    console.log(historyId)
    let ans = confirm('SURELY TO DELETE ?')
    if (ans){
      await fetch(`http://localhost:6060/history/${historyId}`, {
        method: 'DELETE'
      })
      location.reload() 
    }
}


// HANDLE EDIT HISTORY
const handleEditH = (Id ,game) => {
    console.log(Id)
    console.log(game)

    document.getElementById('games').innerText = game
    document.getElementById('btnInput').disabled = true
    document.getElementById('btnEdit').disabled = false

}


// HANDLE REGISTER
const handleRegister = async () => {
    let regUsername = document.getElementById('regUsername').value
    let regFullname = document.getElementById('regFullname').value
    let regAddress = document.getElementById('regAddress').value
    let regAge = document.getElementById('regAge').value
    let regHobby = document.getElementById('regHobby').value

    const resp = await fetch('http://localhost:6060/register', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username: regUsername,
            fullname: regFullname,
            address: regAddress,
            age: regAge,
            hobby: regHobby
        })
    })

    if(resp.status === 201) {
        alert('INPUT DATA SUCCESS')
        emptyRegister()
    } else {
        alert('INPUT DATA FAILED')
    }
}


// HANDLE INPUT HYSTORY
const handleInput  = async (UsergameId) => {
    let mygame = document.getElementById('games').value
    let myscore = document.getElementById('scores').value
    let myrank = document.getElementById('ranks').value
    
    const resp = await fetch('http://localhost:6060/history', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            game: mygame,
            score: myscore,
            rank: myrank,
            UsergameId: UsergameId
        })
    })

    if(resp.status === 201) {
        alert('INPUT DATA SUCCESS')
        location.reload()
    } else {
        alert('INPUT DATA FAILED')
    }
}


//HANDLE FIND USERNAME
const hanldeFindUsername = async () => {
    let findUsername = document.getElementById('findUsername').value   
    const resp = await fetch(`http://localhost:6060/data/${findUsername}`)
    console.log(resp)

    if(resp.status === 404){
        alert("USER NOT FOUND")
      }else{
        const data = await resp.json()
        console.log(data.username)
        window.location.href = `/detail/${data.id}`
      }
}


//HANDLE EDIT BIODATA
const handleBiodataEdit = async (biodataId) => {
    let Fullname = document.getElementById('Fullname').value
    let Address = document.getElementById('Address').value
    let Age = document.getElementById('Age').value
    let Hobby = document.getElementById('Hobby').value
    console.log(biodataId)
    const resp = await fetch(`http://localhost:6060/biodata/${biodataId}`, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            fullname: Fullname,
            address: Address,
            age: Age,
            hobby: Hobby
        })
    })

    if(resp.status === 202) {
        alert("DATA HAS BEEN EDITED")
    } else {
        alert("FAILED EDIT")
    }
}


//AUTHIRIZED
const authorizer = async () => {
    const myUser = document.getElementById("userAdmin").value
    const myPassword = document.getElementById("passAdmin").value

    const resp = await fetch(URL_LOGIN, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: myUser,
        password: myPassword
      })
    })
    // unauthorized
    if(resp.status === 401){
      alert("USER & PASSWORD INVALIED")
    }else{
      alert("USER & PASSWORD CORRECT")
      window.location.href = `/dashboard`
    }
  }