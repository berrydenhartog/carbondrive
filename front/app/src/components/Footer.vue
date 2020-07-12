<template>    
  <div class="myfooter">
    <footer class="footer">
      <div class="columns is-centered">
        <div class="column">
          <div class="content">
            <ul>
              <li>
                <router-link class="navbar-item" :to="{ name: 'WorkInProgress'}">
                  Algemene Voorwaarden
                </router-link>
              </li>
              <li>
                <router-link class="navbar-item" :to="{ name: 'WorkInProgress'}">
                  Privacy Statement
                </router-link>
              </li> 
              <li>
                <router-link class="navbar-item" :to="{ name: 'Contact'}">
                  Contact
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="has-text-centered">
        <p>
          &copy; <strong> CarbonDrive</strong>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
