<script setup>
import { onMounted, ref } from 'vue';


const eventsTest = ref([]);
onMounted(async () => {
  
  // try {
  //   products.value = await getProducts();
  //   categories.value = await getCategories();
  //   item.value = await getSingleProduct(5);
  // } catch (error) {
  //   console.log(error);
  //   throw new Error(error);
  // }
  
});

const currentDate = new Date();
const dateNumber = currentDate.getDate();

let specificDateEvents = [];

const storedEvents = JSON.parse(localStorage.getItem('events')) || [];

// console.log(storedEvents);

function addEvent(date, title, description, hour, minute, timestamp) {
  const newEvent = { date, title, description, hour, minute, timestamp };
  storedEvents.push(newEvent);
  saveEventsToLocalStorage();
  location.reload();
}

// Function to save events to local storage
function saveEventsToLocalStorage() {
  localStorage.setItem('events', JSON.stringify(storedEvents));
}

function getMonth() {
  return currentDate.toLocaleDateString(undefined, { month: 'long' });
}

function getYear() {
  return currentDate.getFullYear();
}

function getFirstDayOfCurrentMonth() {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January)

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const dayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const firstDayData = {
    date: 1,
    dayOfWeek: dayOfWeek,
    isWeekend: isWeekend,
  };

  return firstDayData;
}

function getDaysInCurrentMonth() {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January)

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0); // 0 day of next month is the last day of the current month

  const daysInMonth = [];
  let dayId = 0; // Initialize a unique ID counter

  for (let day = firstDayOfMonth.getDate(); day <= lastDayOfMonth.getDate(); day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const timestamp = date.getTime();

    let eventAmount = 0;

    

    storedEvents.forEach(element => {
      if (element.date == day) {
        eventAmount ++;
        // console.log(element.date);
        // console.log(storedEvents.date);
      } 
    });

    daysInMonth.push({
      id: dayId, // Assign a unique ID
      date: day,
      timestamp: timestamp,
      dayOfWeek: dayOfWeek,
      isWeekend: isWeekend,
      events: eventAmount
    });

    dayId++; // Increment the unique ID for the next day
  }

  return daysInMonth;
}

function getFirstWeekOfCurrentMonth() {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January)

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const dayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Calculate the number of days in the first week of the month
  const daysInFirstWeek = 7 - dayOfWeek;

  const firstWeekData = {
    date: 1,
    dayOfWeek: dayOfWeek,
    isWeekend: isWeekend,
    daysInFirstWeek: daysInFirstWeek + 1,
    leftDays: 7 - daysInFirstWeek - 1
  };

  return firstWeekData;
}


const firstDay = getFirstDayOfCurrentMonth();
const daysInCurrentMonth = getDaysInCurrentMonth();
const currentMonth = getMonth();
const currentYear = getYear();
const WeekData = getFirstWeekOfCurrentMonth();
// console.log(daysInCurrentMonth);
// console.log(WeekData);


function AddEventListener() {
  
  const buttons = document.querySelectorAll('#date');
  const body = document.getElementById('body');
  const addEventView = document.getElementById('addEventView');
  const EventSubmit = document.getElementById('EventSubmit');
  const EventAddTitle = document.getElementById('EventAddTitle');
  const closeEventAdd = document.getElementById('closeEventAdd');
  const dateDetails = document.getElementById('dateDetails');
  const dateDetailsTitle = document.getElementById('specificDate');
  const closeDateDetails = document.getElementById('closeDateDetails');
  const createEventBTN = document.getElementById('createEventBTN');

  const inputTitle = document.getElementById('title');
  const inputDesc = document.getElementById('description');
  const inputDate = document.getElementById('dateInput');
  const inputTimestamp = document.getElementById('timestamp');
  const inputHour = document.getElementById('hour');
  const inputMinute = document.getElementById('minute');

  closeEventAdd.addEventListener('click', () => {
    body.classList.remove('overflow-hidden');
    addEventView.classList.add('hidden');

    inputTitle.value = "";
    inputDesc.value = "";
  })
  
  closeDateDetails.addEventListener('click', () => {
    body.classList.remove('overflow-hidden');
    dateDetails.classList.add('hidden');
    eventsTest.value = [];
  })
  
  createEventBTN.addEventListener('click', () => {
    addEventView.classList.remove('hidden');
    EventAddTitle.innerHTML = 'Add an event to your selected date (' + createEventBTN.getAttribute('data-date') + ').';
    inputDate.value = createEventBTN.getAttribute('data-date');
    inputTimestamp.value = createEventBTN.getAttribute('data-timestamp');
    console.log('test');
  })

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      // alert(button.getAttribute('data-key'));
      // console.log(button.getAttribute('data-timestamp'));
      dateDetailsTitle.innerHTML = button.getAttribute('data-key');
      body.classList.add('overflow-hidden');
      dateDetails.classList.remove('hidden');
      createEventBTN.setAttribute('data-date', button.getAttribute('data-key'));
      createEventBTN.setAttribute('data-timestamp', button.getAttribute('data-timestamp'));

      storedEvents.forEach(event => {
        // console.log(button.getAttribute('data-key'));
        if (event.date == button.getAttribute('data-key')) {
          // console.log(event);
          eventsTest.value.push(event);
          console.log(specificDateEvents);
        }
      });
    });
  });

  EventSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    
    let title = inputTitle.value;
    let description = inputDesc.value;
    let date = inputDate.value;
    let hour = inputHour.value;
    let minute = inputMinute.value;
    let timestamp = inputTimestamp.value;
    if (title != '' && hour != '' && minute != '') {
      addEvent(date, title, description, hour, minute, timestamp);
      inputTitle.value = "";
      inputDesc.value = "";
      inputDate.value = "";
      body.classList.remove('overflow-hidden');
      addEventView.classList.add('hidden');
    } else {
      alert('Some required fields are empty!');
    }
  });
}

setTimeout(AddEventListener, 100);





</script>

<template>
  
  <div>
    <div class="calendar w-screen h-fit min-h-screen bg-[#202020]">
      <div class="monthContainer w-full h-fit flex p-4 items-center py-8">
        <span class="text-4xl font-bold">{{ currentMonth }} / {{ currentYear }}</span>
      </div>
      <div class="daysLabelsContainer grid grid-cols-7 gap-1 w-full h-fit pl-5 pr-5">
        <div class="dayBox bg-[#303030] h-24 rounded-md border-2 border-[#424242] w-full font-bold text-xl flex justify-center items-center transition-all ease-in-out hover:bg-[#363636]">
          E
        </div>
        <div class="dayBox bg-[#303030] h-24 rounded-md border-2 border-[#424242] w-full font-bold text-xl flex justify-center items-center transition-all ease-in-out hover:bg-[#363636]">
          T
        </div>
        <div class="dayBox bg-[#303030] h-24 rounded-md border-2 border-[#424242] w-full font-bold text-xl flex justify-center items-center transition-all ease-in-out hover:bg-[#363636]">
          K
        </div>
        <div class="dayBox bg-[#303030] h-24 rounded-md border-2 border-[#424242] w-full font-bold text-xl flex justify-center items-center transition-all ease-in-out hover:bg-[#363636]">
          N
        </div>
        <div class="dayBox bg-[#303030] h-24 rounded-md border-2 border-[#424242] w-full font-bold text-xl flex justify-center items-center transition-all ease-in-out hover:bg-[#363636]">
          R
        </div>
        <div class="dayBox bg-[#303030] h-24 rounded-md border-2 border-[#424242] w-full font-bold text-xl flex justify-center items-center transition-all ease-in-out hover:bg-[#363636]">
          L
        </div>
        <div class="dayBox bg-[#303030] h-24 rounded-md border-2 border-[#424242] w-full font-bold text-xl flex justify-center items-center transition-all ease-in-out hover:bg-[#363636]">
          P
        </div>
      </div>
      <div class="daysContainer grid grid-cols-7 gap-1 w-full h-fit pt-1 px-5 pb-5">
        <div
          v-for="day in WeekData.leftDays"
          :key="day.date"
          class="dayBox  bg-[#272727] h-full w-full aspect-video rounded-md font-bold border-2 border-[#424242] text-xl flex justify-center items-center transition-all ease-in-out hover:bg-[#292929]"
        ></div>
        <div
          v-for="day in daysInCurrentMonth"
          id="date"
          :key="day.date"
          :data-key="day.date"
          :data-timestamp="day.timestamp"
          class=" bg-[#303030] h-auto w-full aspect-video px-2 pt-1 font-bold text-xl border-2 border-[#424242] rounded-md flex transition-all ease-in-out hover:bg-[#363636] relative"
          :class="{ weekendText: day.isWeekend, active: day.date === dateNumber }"
        >
          {{ day.date }}
          <div class=" absolute bottom-2 left-2 right-2 h-2 flex items-center gap-1 ">
            <div 
              v-for="event in day.events" 
              class=" aspect-square h-full bg-green-500 rounded-full"
            >
              
            </div>
          </div>
        </div>
      </div>
    </div>


    <div id="dateDetails" class="w-full bg-black/50 backdrop-blur h-screen fixed inset-0 overflow-auto z-40 p-8 hidden">
      <div class="flex justify-between">
          <h1 class="text-white text-2xl pb-4">Date: <span id="specificDate" class="font-bold">29</span></h1>
          <div class="text-white border-2 rounded w-8 h-8 flex justify-center items-center cursor-pointer hover:border-red-500" id="closeDateDetails">X</div>
        </div>
      <div class=" w-full h-fit">
        <div class="flex flex-col gap-1 pt-2">
          <div class="w-full h-fit  mb-1">
            <div id="createEventBTN" data-date="" data-timestamp="" class="px-4 py-2  border-2 rounded-md w-fit text-white font-bold bg-blue-500/50 border-blue-500">
              Create event
            </div>
          </div>
          <div v-for="(event, index) in eventsTest" :key="index" :data-key="index"  class="w-full h-fit bg-[#303030] rounded-md p-4">
            <div class="flex flex-col">
              <h1 class="text-white text-xl font-bold">{{ event.title }}</h1>
              <p class="italic">Date: {{ event.date }}</p>
              <p class="italic">Time: <span>{{ event.hour }}:{{ event.minute }}</span></p>
            </div>
          </div>
          <div 
            class="p-4 bg-[#303030] rounded-md"
            :class="{ 'hidden' : eventsTest != '' }"
          >
            No events right now
          </div>
        </div>
      </div>
    </div>


    <!-- <div class="w-full h-fit bg-[#202020] p-4">
      <h1 class="text-2xl font-bold">Added Events:</h1>
      <div class="flex flex-col gap-1 pt-2">
        <div v-for="(event, index) in storedEvents" :key="index" :data-key="index"  class="w-full h-fit bg-[#303030] rounded-md p-4">
          <div class="flex flex-col">
            <h1 class="text-white text-xl font-bold">{{ event.title }}</h1>
            <p class="italic">Date: {{ event.date }}</p>
            <p class="italic">Time: <span>{{ event.hour }}:{{ event.minute }}</span></p>
          </div>
        </div>
        <div 
          class="p-4 bg-[#303030] rounded-md"
          :class="{ 'hidden' : storedEvents != '' }"
        >
          No events right now
        </div>
      </div>
    </div> -->


    <div id="addEventView" class="w-full bg-black/50 backdrop-blur h-screen fixed inset-0 overflow-auto z-50 hidden">
      <form action="" method="post" class="flex flex-col p-8 text-black gap-1 ">
        <div class="flex justify-between">
          <h1 class="text-white font-bold text-2xl pb-4" id="EventAddTitle">Add an event to your selected date</h1>
          <div class="text-white border-2 rounded w-8 h-8 flex justify-center items-center cursor-pointer hover:border-red-500" id="closeEventAdd">X</div>
        </div>
        <p class="bg-white rounded-t-xl rounded-sm p-2 px-4 font-bold">Title*</p>
        <input type="text" name="title" id="title" placeholder="Title*" class="p-2 px-4 rounded-sm" required>
        <p class="bg-white rounded-sm p-2 px-4 font-bold">Description*</p>
        <textarea name="description" id="description" cols="30" rows="10" placeholder="Description" class="rounded-sm w-full p-2 px-4 resize-none"></textarea>
        <input type="hidden" name="date" id="dateInput">
        <input type="hidden" name="timestamp" id="timestamp">
        <p class="bg-white rounded-sm p-2 px-4 font-bold">Time*</p>
        <div class="flex gap-1">
            <select name="hour" id="hour" class="w-1/2 rounded-sm p-2 px-4" required>
              <option value="">Hour</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
            </select>
            <select name="minute" id="minute" class="w-1/2 rounded-sm p-2 px-4" required>
              <option value="">Minute</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
              <option value="32">32</option>
              <option value="33">33</option>
              <option value="34">34</option>
              <option value="35">35</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
              <option value="46">46</option>
              <option value="47">47</option>
              <option value="48">48</option>
              <option value="49">49</option>
              <option value="50">50</option>
              <option value="51">51</option>
              <option value="52">52</option>
              <option value="53">53</option>
              <option value="54">54</option>
              <option value="55">55</option>
              <option value="56">56</option>
              <option value="57">57</option>
              <option value="58">58</option>
              <option value="59">59</option>
            </select>
        </div>
        <input type="submit" value="Save" id="EventSubmit" class="p-2 px-4 bg-white text- border-2 rounded-b-xl rounded-sm">
      </form>
    </div>
  </div>

</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
