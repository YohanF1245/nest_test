<script>
    import { onMount } from 'svelte';

    let cities = []; // Crée une variable pour stocker les données des villes
    let loading = true; // État de chargement
    let error = null; // État d'erreur

    // Fonction pour récupérer les données des villes
    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/cities');
            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des villes : ${response.statusText}`);
            }
            cities = await response.json();
        } catch (err) {
            console.error(err);
            error = err.message; // Stocke le message d'erreur
        }
        loading = false; // Met à jour l'état de chargement
    });
</script>

<h1>Welcome to SvelteKit</h1>

{#if loading}
    <p>Loading...</p>
{:else if error}
    <p>Error: {error}</p> <!-- Affiche le message d'erreur -->
{:else}
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {#each cities as city}
                <tr>
                    <td>{city.name}</td>
                    <td>{city.description || 'No description available'}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}
