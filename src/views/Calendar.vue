<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn color="primary" dark @click.stop="dialog = true">
            New Event
          </v-btn>
          <v-btn outlined class="mr-4" @click="setToday"> Today </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field
                v-model="name"
                type="text"
                label="event name (required)"
              ></v-text-field>
              <v-text-field
                v-model="details"
                type="text"
                label="detail"
              ></v-text-field>
              <v-menu class="mb-4" offset-y transition="scale-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="patient"
                    color="primary"
                    width="450px"
                    label="Paciente"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-text-field>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in items" :key="index">
                    <v-list-item-title @click="selectPatient(item)">{{
                      item.paciente
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="day"
                    label="Data da Consulta"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="day"
                  :active-picker.sync="activePicker"
                  max="2050-01-01"
                  :min="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                ></v-date-picker>
              </v-menu>
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="start"
                    label="Hora de Inicio"
                    type="time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="start"
                  format="24hr"
                  scrollable
                  :active-picker.sync="activePicker"
                  ampm-in-title
                ></v-time-picker>
              </v-menu>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="end"
                    label="Hora de Fim"
                    type="time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="end"
                  format="24hr"
                  :active-picker.sync="activePicker"
                  scrollable
                  ampm-in-title
                ></v-time-picker>
              </v-menu>
              <v-menu
                ref="menu3"
                v-model="menu3"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="color"
                    label="Selecione uma Cor"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-color-picker
                  v-model="color"
                  :active-picker.sync="activePicker"
                  :swatches="swatches"
                  show-swatches
                ></v-color-picker>
              </v-menu>
              <v-btn
                type="submit"
                color="primary"
                class="mr-4"
                @click.stop="dialog = false"
              >
                create event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDate" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field
                v-model="name"
                type="text"
                label="event name (required)"
              ></v-text-field>
              <v-text-field
                v-model="details"
                type="text"
                label="detail"
              ></v-text-field>
              <v-menu class="mb-4" offset-y transition="scale-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="patient"
                    color="primary"
                    width="450px"
                    label="Paciente"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-text-field>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in items" :key="index">
                    <v-list-item-title @click="selectPatient(item)">{{
                      item.paciente
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="day"
                    label="Data da Consulta"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="day"
                  :active-picker.sync="activePicker"
                  max="2050-01-01"
                  :min="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                ></v-date-picker>
              </v-menu>
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="start"
                    label="Hora de Inicio"
                    type="time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="start"
                  format="24hr"
                  scrollable
                  :active-picker.sync="activePicker"
                  ampm-in-title
                ></v-time-picker>
              </v-menu>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="end"
                    label="Hora de Fim"
                    type="time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="end"
                  format="24hr"
                  :active-picker.sync="activePicker"
                  scrollable
                  ampm-in-title
                ></v-time-picker>
              </v-menu>
              <v-menu
                ref="menu3"
                v-model="menu3"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="color"
                    label="Selecione uma Cor"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-color-picker
                  v-model="color"
                  :active-picker.sync="activePicker"
                  :swatches="swatches"
                  show-swatches
                ></v-color-picker>
              </v-menu>
              <v-btn
                type="submit"
                color="primary"
                class="mr-4"
                @click.stop="dialog = false"
              >
                create event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="setDialogDate"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
        >
          <v-card color="grey lighten-4" :width="350" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>

            <v-card-text>
              <form v-if="currentlyEditing !== selectedEvent.id">
                <v-card-text class="font-weight-bold">
                  <v-row>Paciente: {{ selectedEvent.patient }}</v-row>
                  <v-row> Detalhes: {{ selectedEvent.details }}</v-row>
                </v-card-text>
              </form>
              <form v-else>
                <v-card>
                  <v-container>
                    <v-form @submit.prevent="updateEvent">
                      <v-text-field
                        v-model="details"
                        type="text"
                        label="detail"
                      ></v-text-field>
                      <v-menu
                        ref="menu1"
                        v-model="modal1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="start"
                            label="Hora de Inicio"
                            type="time"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="modal1"
                          v-model="start"
                          format="24hr"
                          scrollable
                          :active-picker.sync="activePicker"
                          ampm-in-title
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal1 = false"
                            >Cancel</v-btn
                          >
                          <v-btn text color="primary" @click="modal1 = false"
                            >OK</v-btn
                          ></v-time-picker
                        >
                      </v-menu>
                      <v-menu
                        ref="menu2"
                        v-model="modal2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="end"
                            label="Hora de Fim"
                            type="time"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="modal2"
                          v-model="end"
                          format="24hr"
                          :active-picker.sync="activePicker"
                          scrollable
                          ampm-in-title
                          ><v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal2 = false"
                            >Cancel</v-btn
                          >
                          <v-btn text color="primary" @click="modal2 = false"
                            >OK</v-btn
                          ></v-time-picker
                        >
                      </v-menu>
                      <v-btn
                        type="submit"
                        color="primary"
                        class="mr-4"
                        @click.stop="dialog = false"
                      >
                        update event
                      </v-btn>
                      <v-btn
                        type="submit"
                        color="secundary"
                        class="mr-4"
                        @click.stop="selectedOpen = false"
                      >
                        cancel
                      </v-btn>
                    </v-form>
                  </v-container>
                </v-card>
              </form>
            </v-card-text>

            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                close
              </v-btn>
              <v-btn
                v-if="currentlyEditing !== selectedEvent.id"
                text
                @click.prevent="editEvent(selectedEvent)"
              >
                edit
              </v-btn>
              <v-btn
                text
                v-else
                type="submit"
                @click.prevent="updateEvent(selectedEvent)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { getAuth } from "@firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { mapGetters } from "vuex";
export default {
  name: "FrontCalendar",
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    name: null,
    details: null,
    day: null,
    start: null,
    end: null,
    color: "#1976D2", // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    dialogDate: false,
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
    swatches: [
      ["#FF0000", "#AA0000", "#550000"],
      ["#FFFF00", "#AAAA00", "#555500"],
      ["#00FF00", "#00AA00", "#005500"],
      ["#00FFFF", "#00AAAA", "#005555"],
      ["#0000FF", "#0000AA", "#000055"],
    ],
    selectedPatient: "",
    modal2: false,
    modal1: false,
  }),
  computed: {
    submittableDataTime(time) {
      const date = new Date(this.day);
      date.setHours(time);
      return date;
    },
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;
      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;
      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);
      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },
    watch: {
      menu(val) {
        val && setTimeout(() => (this.activePicker = "YEAR"));
      },
    },
    ...mapGetters(["currentUser"]),
    user() {
      return this.currentUser;
    },
  },
  mounted() {
    this.getEvents();
    this.getPatients(this.currentUser.uid);
  },
  methods: {
    selectPatient(item) {
      this.selectedPatient = item;
      if (this.patient != undefined) {
        this.patient = undefined;
      }
      this.patient = item.paciente;
      console.log("PACIENTE ->" + this.selectedPatient);
    },
    async getPatients(professionalUID) {
      const app = getAuth().app;
      const db = getFirestore(app);
      let snapshot = await getDocs(collection(db, "Professional"));

      snapshot.forEach((doc) => {
        if (doc.id == professionalUID) {
          let appData = doc.data();
          this.items = appData.patients;
          console.log(
            "DATA ->",
            appData.patients,
            "doc id ",
            doc.id,
            "current user ",
            getAuth().currentUser.uid
          );
        }
      });
    },
    async getEvents() {
      const app = getAuth().app;
      const db = getFirestore(app);
      let snapshot = await getDocs(collection(db, "calEvents"));
      const events = [];
      snapshot.forEach((doc) => {
        let appData = doc.data();
        appData.id = doc.id;
        events.push(appData);
      });
      this.events = events;
    },
    setDialogDate({ date }) {
      this.dialogDate = true;
      this.focus = date;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    async addEvent() {
      const app = getAuth().app;
      const db = getFirestore(app);
      if (this.name && this.start && this.end) {
        var event = await addDoc(collection(db, "calEvents"), {
          host: this.currentUser.uid,
          name: this.name,
          details: this.details,
          patient: this.selectedPatient.paciente,
          patientDoc: this.selectedPatient.cpf,
          start: this.day + " " + this.start.toString(),
          end: this.day + " " + this.end.toString(),
          color: this.color,
        });
        await updateDoc(doc(db, "Patient", this.selectedPatient.cpf), {
          nextConsult: event.id,
        });
        this.getEvents();
        (this.name = ""),
          (this.details = ""),
          (this.patient = ""),
          (this.day = ""),
          (this.start = ""),
          (this.end = ""),
          (this.color = "");
      } else {
        alert("You must enter event name, start, and end time");
      }
    },
    editEvent(ev) {
      this.currentlyEditing = ev.id;
    },

    //------------------------------- AJUSTAR UPDATE ----------------------------
    async updateEvent() {
      const app = getAuth().app;
      const db = getFirestore(app);
      let list = await getDocs(collection(db, "calEvents"));
      list.forEach((document) => {
        if (document.id === this.currentlyEditing) {
          var date = document.data().start.split(" ");
          console.log("DOC START -->", date);
          if (
            this.details !== null &&
            this.start !== Object &&
            this.start !== Object
          ) {
            updateDoc(doc(db, "calEvents", this.currentlyEditing), {
              details: this.details,
              start: date[0] + " " + this.start,
              end: date[0] + " " + this.end,
            });
          }
          this.getEvents();
          (this.name = ""),
            (this.details = ""),
            (this.patient = ""),
            (this.day = ""),
            (this.start = ""),
            (this.end = ""),
            (this.color = "");
          (this.selectedOpen = false), (this.currentlyEditing = null);
        }
      });
    },

    //----------------------------------------------------------------------------
    async deleteEvent(ev) {
      const app = getAuth().app;
      const db = getFirestore(app);

      await deleteDoc(doc(db, "calEvents", ev));
      this.selectedOpen = false;
      this.getEvents();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
  },
};
</script>
