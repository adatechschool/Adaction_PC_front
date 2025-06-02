





/*document.getElementById("button").onclick = async function (e) {
    e.preventDefault()
    const email = document.getElementById("email");
    const passWord = document.getElementById("pass");

    let request = `http://localhost:8000/volunteer/${email.value}`;
    let data = await fetch(request)
    console.log(data)
    //let response = await data.json
};*/

document.getElementById("button").onclick = async function (e) {
    e.preventDefault()
    const email = document.getElementById("email");
    const passWord = document.getElementById("pass");

    let request = `http://localhost:8000/volunteer/${email.value}`;

    try {
        let data = await fetch(request);
        console.log(data)
        
        if (!data.ok) {
            throw new Error(`Erreur HTTP : ${data.status}`);
        }

        let response = await data.json();
        console.log(response);

        if (response && response.Is_admin === 0){
            console.log("Bénévole non administrateur")
            window.location.replace('volunteer.html');

        }else{
            console.log("C'est un administrateur")
            window.location.replace('admin.html');
        }

    } catch (error) {
        console.error('Erreur réseau :', error);
    }
};