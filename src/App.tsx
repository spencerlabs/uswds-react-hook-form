import {
  DatePicker,
  DateRangePicker,
  Fieldset,
  Form,
  Input,
  Date,
  Textarea,
} from './lib'

function App() {
  return (
    <Form>
      <Fieldset label={{ text: 'Profile Information', large: true }}>
        <Input
          label="First or given name"
          hint="For example, Jose, Darren, or Mai"
          name="first"
          characterCount
          maxLength={25}
        />
        <Date defaultValues={{ day: 19 }} label="Date of Birth" name="dob" />
        <Textarea label="Your profile bio" name="bio" />
        <DatePicker
          label="New date"
          name="new-date"
          minDate="2022-10-25"
          onChange={(e) => console.log(e.target.value)}
        />
        <DateRangePicker name="Event" onChange={(v) => console.log(v)} />
      </Fieldset>
    </Form>
  )
}

export default App
