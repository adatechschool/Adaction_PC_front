document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    let request = `http://localhost:8000/volunteers/index`

    try {
        let data = await fetch(request);
        console.log(data)
        
        if (!data.ok) {
            throw new Error(`Erreur HTTP : ${data.status}`);
        }

        let response = await data.json();
        console.log(response);

        
        for (let i = 0; i < response.length; i ++){
            const list = document.querySelector('ul')
            const volunteer = document.createElement('p');
            list.appendChild(volunteer);
            volunteer.innerHTML += `<h2> ${response[i].firstname} ${response[i].lastname} ${response[i].name}`
            
        }

    } catch (error) {
        console.error('Erreur réseau :', error);
    }

  });