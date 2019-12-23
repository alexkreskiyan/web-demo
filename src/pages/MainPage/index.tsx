// import { Field, Form, FormState, pattern, required, useForm, ValidationStatus } from '@annium/forms'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import { observer, useAsObservableSource } from 'mobx-react-lite'
import React from 'react'

import { Field } from '../../forms/Field'
import { Form } from '../../forms/Form'
import { pattern, required } from '../../forms/validators'

import { Store } from './store'


export const MainPage = observer(() => {
  const store = useAsObservableSource(new Store())
  const form = store.form

  return (
    <>
      <Form state={form}>
        <div>
          <Field name="name" validators={[required({ message: 'yes!' })]}>
            <TextField label="name" placeholder="name" />
          </Field>
          <Field name="pass" validators={pattern({ pattern: /[a-z]{8,}/i })}>
            <TextField label="pass" placeholder="pass" />
          </Field>
          <Field name="remember" valueProp="checked">
            <FormControlLabel label="remember" control={<Checkbox color="primary" />} />
          </Field>
          <Field name="remember" valueProp="checked">
            <FormControlLabel label="remember" control={<Switch />} />
          </Field>
        </div>
        <div>
          <Button onClick={store.addNote}>Add Note</Button>
          {form.data.notes.map((_, i) => (
            <div key={`notes[${i}]`}>
              <Field name={`notes[${i}].title`} validators={required()}>
                <TextField label="title" placeholder="title" />
              </Field>
              <Field name={`notes[${i}].text`} validators={required()}>
                <TextField label="text" placeholder="text" />
              </Field>
              <Button onClick={store.deleteNote(i)}>Delete</Button>
            </div>
          ))}
        </div>
      </Form>
      <Button disabled={!form.isComplete || !form.isValid}>Submit</Button>
      <Button onClick={store.loadUser}>Load User</Button>
      <Button onClick={store.emulateServerValidation}>Emulate Server Validation</Button>
    </ >
  )
})
