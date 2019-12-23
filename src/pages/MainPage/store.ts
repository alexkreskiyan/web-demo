import { HttpResponse } from '@annium/client-http'
import { action, observable } from 'mobx'

import { api } from '../../api'
import { FormState } from '../../forms/FormState'
import { ValidationStatus } from '../../forms/validation/ValidationStatus'


type Login = {
  name: string
  pass: string
  remember: boolean
  notes: Note[]
}

type Note = {
  title: string
  text: string
}

export class Store {
  @observable
  public form: FormState<Login> = new FormState<Login>({ name: '', pass: '', remember: false, notes: [] })

  @action.bound
  public async loadUser() {
    // tslint:disable-next-line: no-any
    const result: HttpResponse<any> = await api.get<unknown>('/')
    // tslint:disable-next-line: no-unsafe-any
    const user = result.data.results[0].login
    // tslint:disable-next-line: no-unsafe-any
    this.form.data.name = user.username
    // tslint:disable-next-line: no-unsafe-any
    this.form.data.pass = user.password
  }

  @action.bound
  public emulateServerValidation() {
    this.form.validation = {
      name: { status: ValidationStatus.Error, message: 'name already taken' },
      pass: { status: ValidationStatus.Error, message: 'pass doesn\'t match constraints' },
    }
  }

  @action.bound
  public addNote() {
    this.form.data.notes.push({ title: '', text: '' })
  }

  @action.bound
  public deleteNote(index: number) {
    return () => this.form.data.notes.splice(index, 1)
  }
}
