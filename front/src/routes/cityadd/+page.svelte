<script>
    import { onMount } from 'svelte';

    let name = '';
    let description = '';
    let active = true;
    let loading = false;
    let successMessage = '';
    let errorMessage = '';

    const submitForm = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        loading = true;
        successMessage = '';
        errorMessage = '';

        try {
            const response = await fetch('http://localhost:3000/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, active }),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            successMessage = `Ville ajoutée avec succès : ${data.name}`;
            // Réinitialiser le formulaire
            name = '';
            description = '';
            active = true;
        } catch (error) {
            errorMessage = error.message;
        } finally {
            loading = false;
        }
    };
</script>

<h1>Ajouter une Ville</h1>

<form on:submit={submitForm}>
    <div>
        <label for="name">Nom:</label>
        <input type="text" id="name" bind:value={name} required />
    </div>
    <div>
        <label for="description">Description:</label>
        <textarea id="description" bind:value={description}></textarea>
    </div>
    <div>
        <label for="active">Active:</label>
        <input type="checkbox" id="active" bind:checked={active} />
    </div>
    <button type="submit" disabled={loading}>{loading ? 'Enregistrement...' : 'Ajouter'}</button>
</form>

{#if successMessage}
    <p class="success">{successMessage}</p>
{:else if errorMessage}
    <p class="error">{errorMessage}</p>
{/if}
