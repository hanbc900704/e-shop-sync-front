<template>
  <AgendaList :content="content"/>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      content: [
        {
          id: 1,
          active: true,
          title: {
            date: "Today",
            time: "9:00AM",
            event: "Senate Rm. 3",
            status: true,
            content: "Senate Education Accountability & Reform",
            url: "",
            data: "",
            data2: ""
          },
          details: {
            agenda: [
              {
                id: "SB1040",
                desc: "public schools; restrooms; reasonable accommodations",
                listCnt: 16,
                event: ""
              },
              {
                id: "SB1054",
                desc: "middle school students; civics; instruction (now: students; civics education; development program)",
                listCnt: 0,
                event: ""
              },
              {
                id: "SB1205",
                desc: "foster children; education; best interest",
                listCnt: 2,
                event: ""
              },
              {
                id: "SB1208",
                desc: "dropout recovery programs; revisions",
                listCnt: 0,
                event: ""
              },
              {
                id: "SB1315",
                desc: "emergency response; students with disabilities",
                listCnt: 0,
                event: ""
              },
              {
                id: "SB1400",
                desc: "technical correction; child hearing programs (now: community colleges; noncredit workforce training)",
                listCnt: 0,
                event: ""
              },
              {
                id: "SB1410",
                desc: "violations of state law; schools",
                listCnt: 2,
                event: "now: school districts; parent complaints; reporting"
              },
              {
                id: "SB1699",
                desc: "probate; mediation; trials",
                listCnt: 0,
                event: "now: licensure; anesthesiologist assistants"
              },
            ],
            members: {
              text: "Education Committee",
              republicans: [
                {
                  avata: "",
                  name: "Pengerelli (R)",
                  role: "Chairman"
                },
                {
                  avata: "",
                  name: "Marschall (R)",
                  role: "Vice-Chairman"
                },
                {
                  avata: "",
                  name: "Cook (R)",
                  role: ""
                },
                {
                  avata: "",
                  name: "Diaz (R)",
                  role: ""
                },
                {
                  avata: "",
                  name: "Peña (R)",
                  role: ""
                },
                {
                  avata: "",
                  name: "Peña (R)",
                  role: ""
                }
              ],
              democrats: [
                {
                  avata: "",
                  name: "Schwiebert (D)",
                  role: ""
                },
                {
                  avata: "",
                  name: "Pawlik (D)",
                  role: ""
                },
                {
                  avata: "",
                  name: "Gutierrez (D)",
                  role: ""
                },
                {
                  avata: "",
                  name: "Terech (D)",
                  role: ""
                }
              ]
            }
          }
        },
        {
          id: 2,
          active: true,
          title: {
            date: "Tomorrow",
            time: "9:00AM",
            event: "Senate Rm. 3",
            status: false,
            content: "Senate Education Accountability & Reform",
            url: "",
            data: "",
            data2: ""
          },
          details: {
            agenda: [
              {
                id: "SB1040",
                desc: "public schools; restrooms; reasonable accommodations",
                listCnt: 16,
                event: ""
              },
              {
                id: "SB1054",
                desc: "middle school students; civics; instruction (now: students; civics education; development program)",
                listCnt: 0,
                event: ""
              },
              {
                id: "SB1205",
                desc: "foster children; education; best interest",
                listCnt: 2,
                event: ""
              },
              {
                id: "SB1208",
                desc: "dropout recovery programs; revisions",
                listCnt: 0,
                event: ""
              },
              {
                id: "SB1315",
                desc: "emergency response; students with disabilities",
                listCnt: 0,
                event: ""
              },
              {
                id: "SB1400",
                desc: "technical correction; child hearing programs (now: community colleges; noncredit workforce training)",
                listCnt: 0,
                event: ""
              },
              {
                id: "SB1410",
                desc: "violations of state law; schools",
                listCnt: 2,
                event: "now: school districts; parent complaints; reporting"
              },
              {
                id: "SB1699",
                desc: "probate; mediation; trials",
                listCnt: 0,
                event: "now: licensure; anesthesiologist assistants"
              },
            ],
            members: {
              text: "Education Committee",
              republicans: [
                {
                  avata: "/images/9.jpg",
                  name: "Pengerelli (R)",
                  role: "Chairman"
                },
                {
                  avata: "/images/9.jpg",
                  name: "Marschall (R)",
                  role: "Vice-Chairman"
                },
                {
                  avata: "/images/9.jpg",
                  name: "Cook (R)",
                  role: ""
                },
                {
                  avata: "/images/9.jpg",
                  name: "Diaz (R)",
                  role: ""
                },
                {
                  avata: "/images/9.jpg",
                  name: "Peña (R)",
                  role: ""
                },
                {
                  avata: "/images/9.jpg",
                  name: "Peña (R)",
                  role: ""
                }
              ],
              democrats: [
                {
                  avata: "/images/9.jpg",
                  name: "Schwiebert (D)",
                  role: ""
                },
                {
                  avata: "/images/9.jpg",
                  name: "Pawlik (D)",
                  role: ""
                },
                {
                  avata: "/images/9.jpg",
                  name: "Gutierrez (D)",
                  role: ""
                },
                {
                  avata: "/images/9.jpg",
                  name: "Terech (D)",
                  role: ""
                }
              ]
            }
          }
        },
        
      ]
    }
  },
}
</script>