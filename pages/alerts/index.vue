<template>
    <AlertsHeader :title="'Alert (' + data.length + ')'" />
    <hr>
    <AlertsList :data="data" />
</template>

<script>
export default {
    name: "Alerts",
    data() {
        return {
        data: [{
            date: "Today",
            alerts: [
                {
                    name: "HB2000 - corporate income tax; rates",
                    details: [
                        {
                            info: "Governor Action",
                            status: "Vetoed"
                        },
                        {
                            info: "Transmit to Govenor",
                            status: ""
                        },
                        {
                            info: "Transmit to Govenor",
                            status: ""
                        },
                        {
                            info: "Transmit to Govenor",
                            status: ""
                        },
                    ]
                },
                {
                    name: "HB2001 - corporate income tax; rates",
                    details: [
                        {
                            info: "Governor Action",
                            status: "Vetoed"
                        },
                        {
                            info: "Transmit to Govenor",
                            status: ""
                        },
                    ]
                },
                {
                    name: "HB2001 - corporate income tax; rates",
                    details: [
                        {
                            info: "Governor Action",
                            status: ""
                        },
                        {
                            info: "Transmit to Govenor",
                            status: ""
                        },
                    ]
                }
            ]},
            {
            date: "Yesterday",
            alerts: [
                {
                    name: "HB2000 - corporate income tax; rates",
                    details: [
                        {
                            info: "Governor Action",
                            status: "Vetoed"
                        },
                        {
                            info: "Transmit to Govenor",
                            status: ""
                        },
                    ]
                },
                {
                    name: "HB2001 - corporate income tax; rates",
                    details: [
                        {
                            info: "Governor Action",
                            status: "Vetoed"
                        },
                        {
                            info: "Transmit to Govenor",
                            status: ""
                        },
                    ]
                }
            ]},
        ]
        }
    },
}
</script>