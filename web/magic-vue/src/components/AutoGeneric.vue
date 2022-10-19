<script setup lang="ts">


const { field , value, onChange } = this.props

const root = field.root
const lookup = root.lookup(field.type)
const isEnum = lookup instanceof protobuf.Enum
const isType = lookup instanceof protobuf.Type


</script>