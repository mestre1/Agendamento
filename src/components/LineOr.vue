<template>
  <div class="line">ou</div>
</template>
<script>
export default {
  name: "LineOr",
};
</script>

<style lang="scss">
.line {
  display: flex;
  align-items: center;
  text-align: center;
  color: black;
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid black;
  }
  &:not(:empty)::before {
    margin-right: 0.56em;
  }
  &:not(:empty)::after {
    margin-left: 0.56em;
  }
}
</style>
