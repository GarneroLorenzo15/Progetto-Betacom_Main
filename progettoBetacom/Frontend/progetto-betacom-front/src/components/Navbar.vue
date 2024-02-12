<template>
    <nav>
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/second">Second Page</router-link>
            </li>
        </ul>
    </nav>
</template>


<script>

export default {
  name: 'Nav-bar'
};
</script>


<style scoped>
nav {
  background-color: #333;
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline;
  margin-right: 10px;
}

li a {
  color: white;
  text-decoration: none;
}

li a:hover {
  text-decoration: underline;
}


</style>