document.getElementById('loginform').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try{
        const response = await fetch('https://localhost:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok){
            if(result.user.Is_admin === 0){
                console.log("Bénévole non administrateur");
                window.location.replace('volunteer.html');
            } else if (result.user.Is_admin === 1){
                console.log("C'est un administrateur")
                window.location.replace('admin.html');
            }
        } else {
            alert(result.error);
        }
    } catch (error){
        console.error('Erreur réseau ou serveur :', error);
        alert("Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
    }
    });


      
