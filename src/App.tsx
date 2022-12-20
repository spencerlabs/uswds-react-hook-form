import {
  ComboBox,
  Date,
  DatePicker,
  DateRangePicker,
  Fieldset,
  Form,
  Input,
  Select,
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
        <Select label="Pick a card" name="card">
          <option>-- Select --</option>
        </Select>
        <ComboBox label="Pick a fruit" name="fruit">
          <option value>Select a fruit</option>
          <option value="apple">Apple</option>
          <option value="apricot">Apricot</option>
          <option value="avocado">Avocado</option>
          <option value="banana">Banana</option>
          <option value="blackberry">Blackberry</option>
          <option value="blood orange">Blood orange</option>
          <option value="blueberry">Blueberry</option>
          <option value="boysenberry">Boysenberry</option>
          <option value="breadfruit">Breadfruit</option>
          <option value="buddhas hand citron">Buddha's hand citron</option>
          <option value="cantaloupe">Cantaloupe</option>
          <option value="clementine">Clementine</option>
          <option value="crab apple">Crab apple</option>
          <option value="currant">Currant</option>
          <option value="cherry">Cherry</option>
          <option value="custard apple">Custard apple</option>
          <option value="coconut">Coconut</option>
          <option value="cranberry">Cranberry</option>
          <option value="date">Date</option>
          <option value="dragonfruit">Dragonfruit</option>
          <option value="durian">Durian</option>
          <option value="elderberry">Elderberry</option>
          <option value="fig">Fig</option>
          <option value="gooseberry">Gooseberry</option>
          <option value="grape">Grape</option>
          <option value="grapefruit">Grapefruit</option>
          <option value="guava">Guava</option>
          <option value="honeydew melon">Honeydew melon</option>
          <option value="jackfruit">Jackfruit</option>
          <option value="kiwifruit">Kiwifruit</option>
          <option value="kumquat">Kumquat</option>
          <option value="lemon">Lemon</option>
          <option value="lime">Lime</option>
          <option value="lychee">Lychee</option>
          <option value="mandarine">Mandarine</option>
          <option value="mango">Mango</option>
          <option value="mangosteen">Mangosteen</option>
          <option value="marionberry">Marionberry</option>
          <option value="nectarine">Nectarine</option>
          <option value="orange">Orange</option>
          <option value="papaya">Papaya</option>
          <option value="passionfruit">Passionfruit</option>
          <option value="peach">Peach</option>
          <option value="pear">Pear</option>
          <option value="persimmon">Persimmon</option>
          <option value="plantain">Plantain</option>
          <option value="plum">Plum</option>
          <option value="pineapple">Pineapple</option>
          <option value="pluot">Pluot</option>
          <option value="pomegranate">Pomegranate</option>
          <option value="pomelo">Pomelo</option>
          <option value="quince">Quince</option>
          <option value="raspberry">Raspberry</option>
          <option value="rambutan">Rambutan</option>
          <option value="soursop">Soursop</option>
          <option value="starfruit">Starfruit</option>
          <option value="strawberry">Strawberry</option>
          <option value="tamarind">Tamarind</option>
          <option value="tangelo">Tangelo</option>
          <option value="tangerine">Tangerine</option>
          <option value="ugli fruit">Ugli fruit</option>
          <option value="watermelon">Watermelon</option>
          <option value="white currant">White currant</option>
          <option value="yuzu">Yuzu</option>
        </ComboBox>
      </Fieldset>
    </Form>
  )
}

export default App
