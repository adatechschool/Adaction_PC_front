document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    let request = `https://localhost:8000/volunteers/index`

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
            const volunteer = document.createElement('li');
            volunteer.textContent = `${response[i].firstname} ${response[i].lastname} ${response[i].name}` 
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Supprimer";
            deleteButton.dataset.id = response[i].id;

            deleteButton.addEventListener("click", async (e)=>{
                //e.preventDefault();
                const id = e.target.dataset.id;

                if (window.confirm("Voulez-vous vraiment supprimer le/la bénévole ?")){

                    try{
                        const response = await fetch(`https://localhost:8000/volunteer/${id}`, {
                            method: 'DELETE'
                        });
                        const result = await response.json();
                        if (response.ok){
                            console.log("bénévole supprimé");
                            location.reload();
                        } else {
                            alert(result.error)
                        }
                    } catch (error){
                        console.error(error);
                        alert("Impossible de se connecter au serveur. Veuillez réessayer plus tard.")
                    }
                }})
                
            volunteer.appendChild(deleteButton);
            list.appendChild(volunteer);
            
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