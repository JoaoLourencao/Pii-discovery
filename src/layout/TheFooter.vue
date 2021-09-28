<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://coreui.io" target="_blank">Pii Discovery</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
