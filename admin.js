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

  document.getElementById('add-volunteer').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log(data);

    try {
        const response = await fetch('http://localhost:8000/volunteer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Bénévole ajouté avec succès !");
            // Redirection ou remise à zéro du formulaire
            e.target.reset();
        } else {
            alert(`Erreur : ${result.error || 'Vérifiez les champs du formulaire.'}`);
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        alert("Erreur lors de l'envoi du formulaire. Veuillez réessayer.");
    }
    });