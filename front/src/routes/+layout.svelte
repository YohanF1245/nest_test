<style>
    ul {
        background-color: aliceblue;
        margin-top: 0;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: end;
        gap: 1rem;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>

<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/cityview">City View</a></li>
    <li><a href="/cityadd">City Add</a></li>
</ul>

<slot />