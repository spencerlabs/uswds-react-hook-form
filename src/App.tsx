import { Fieldset, Form, Input, MemorableDate } from './lib'

function App() {
  return (
    <Form>
      <Fieldset label={{ text: 'Contact Information', large: true }}>
        <Input
          label="First or given name"
          hint="For example, Jose, Darren, or Mai"
          name="first"
          characterCount
          maxLength={25}
        />
      </Fieldset>
      <MemorableDate label="Date of Birth" name="dob" />
    </Form>
  )
}

export default App
