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