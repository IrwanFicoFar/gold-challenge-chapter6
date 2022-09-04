const emptyRegister = () => {
    document.getElementById('regUsername').value = null
    document.getElementById('regFullname').value = null
    document.getElementById('regAddress').value = null
    document.getElementById('regAge').value = null
    document.getElementById('regHobby').value = null
}

const listData = () => {
    window.location.href = `http://localhost:6060/listData`
}

const dashboard = () => {
    window.location.href = `http://localhost:6060/dashboard`
}

const handleDelete = async (dataId) => {
    let ans = confirm('SURE TO DELETE ?')
    if (ans){
      await fetch(`http://localhost:6060/data/${dataId}`, {
        method: 'DELETE'
      })
      location.reload()
    }

  }

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

    console.log('API Called')

    if(resp.status === 201) {
        alert('INPUT DATA SUCCESS')
        emptyRegister()
    } else {
        alert('INPUT DATA FAILED')
    }
}

const handleInput  = async (UsergameId) => {
    let input = document.getElementById('input-history').value
    const resp = await fetch('http://localhost:6060/history', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            history: input,
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
