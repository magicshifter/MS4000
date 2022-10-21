<!-- <script lang="ts">
  
</script> -->

<script setup lang="ts">

import { tsNeverKeyword } from '@babel/types'
import protobuf from 'protobufjs'

import {reactive, watchEffect} from "vue"

enum ControlType {
    Unknown = "!unknown type!",
    String = "string",
    Int32 = "int32",
    // ... TODO: do the talk...
}

type ChangeFunction<T = any> = ((newValue: T) => void)

interface ControlDefinition<T = any> {
    id: string
    key: string
    value: T
    controlType: ControlType
    onChange: ChangeFunction<T>
}


const props = defineProps<{
    field: any,
    value: any,
    onChange: any,
}>()



const state = reactive({
    type: undefined,
    value: undefined,
    def: undefined
})

watchEffect(() => {
    const { field , value, onChange } = props
    const { type, root, name } = field

    // const root = field.root
    const lookup = root.lookup(type) //field.type)
    const isEnum = lookup instanceof protobuf.Enum
    const isType = lookup instanceof protobuf.Type

    const defs: ControlDefinition[] = []
    var noLabel = false

    let def: ControlDefinition | undefined = undefined

    switch (type) {    
      case ControlType.String:
        // controls.push(<div className="pure-u-1-1 pure-u-1-2"><input id={ field.name } key="str" type='text' value={value || ""} onChange={(evt) => {
        //   //console.log("text chnage", evt)
        //   onChange(evt.target.value, field)
        // }}/></div>)
        def = {
            id: name,
            key: "str",
            value,
            controlType: type, // we could override it but we know what it is because we are in case
            // TODO: not happy with any here but I need to sleep soon
            onChange: (newValue: any) => {
                console.log("logging AutoControl onnchange for String control", newValue, field, props)
            }
        }
        break;

      case ControlType.Int32:
      def = {
            id: name,
            key: "str",
            value,
            controlType: type, // we could override it but we know what it is because we are in case
            // TODO: not happy with any here but I need to sleep soon
            onChange: (newValue: any) => {
                console.log("logging AutoControl onChange for Int32 control", newValue, field, type, props)
            }
        }
        // controls.push(<div className="pure-u-1-1 pure-u-1-2"><input id={ field.name } key="str" type='text' value={value || "0"} onChange={(evt) => {
        //   const v = defaultParseInt(evt.target.value)
        //   //console.log("text chnage", evt)

        //   onChange(v, field)
        // }}/></div>)
        break;
    //   case 'RGB':
    //     controls.push(<RGBControl id={ field.name } key="rgb" field={field} value={value} onChange={onChange}/>)
    //     break;

    //   case 'MIDI_OCTAVE':
    //     controls.push(<MIDIOctaveControl id={ field.name } key="octave" field={field} value={value} onChange={onChange}/>)
    //     break

    //   case 'MIDI_SEQUENCE':
    //     controls.push(<MIDISequenceControl id={ field.name } key="sequ" field={field} value={value} onChange={onChange}/>)
    //     break

    //   default:
    //     if (isEnum) {
    //       controls.push(<EnumControl id={ field.name } key="enu" field={field} value={value} onChange={onChange} radioButtons={true}/> )
    //     }
    //     else if (isType) {
    //       noLabel = true
    //       //controls.push(<legend key="leg">{field.name}</legend>)
    //       controls.push(
    //         <div className="ms3000-interface-container">
    //           <AutoInterface key="rec" legend={field.name} skipInputTag={true} type={lookup} value={value} onChange={this.onChangeRecursive} />
    //         </div>)
    //     }
        default:
            def = {
                id: "!!!unlnown type: " + type + " in field:" + name,
                key: "ukn",
                value,
                controlType: type, // we could override it but we know what it is because we are in case
                // TODO: not happy with any here but I need to sleep soon
                onChange: (newValue: any) => {
                    console.log("logging AutoControl onChange for uknwn type: " + type + " control", newValue, field, type, props)
                }
            }
            break;
    }
    // if (!noLabel) {
    //   controls.unshift(<div className="pure-u-1-1 pure-u-1-2"><label id="lbl" className="ms3000-interface-headline" htmlFor={field.name}>{field.name}:&nbsp;</label></div>)
    // }
  
  state.def = def
  state.type = type
  state.value = value
})

</script>

<template>
      <h1 class="green">{{ props.name }}</h1>
      <div>
        type: {{props.type}}
        | value: {{props.value}}
      </div>
  </template>