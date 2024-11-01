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
        loading = false;
    });
</script>
<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }

    th, td {
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    th {
        background-color: #4CAF50;
        color: white;   
    }

    .error {
        color: red;
    }

    .success {
        color: green;
    
    }
</style>
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
                <th>Active</th>
            </tr>
        </thead>
        <tbody>
            {#each cities as city}
                <tr>
                    <td>{city.name}</td>
                    <td>{city.description || 'No description available'}</td>
                    <td>{city.active ? 'Active' : 'Inactive'}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}
