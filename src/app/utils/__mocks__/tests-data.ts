export const metricsData = [
  {
    id: "oee",
    label: "oee",
    value: 0.68,
    type: "percentage",
    description: "The overall equipment efficiency in %",
    category: "efficiency",
  },
  {
    id: "sl",
    label: "Speed loss",
    value: -10.5,
    type: "number",
    description: "The line speed loss",
    category: "efficiency",
  },
  {
    id: "cln_shift",
    label: "Cleaning in shift",
    value: 2280,
    type: "secs",
    description:
      "Time spent (in seconds) cleaning the machines during the last shift",
    category: "shift",
  },
  {
    id: "shift_duration",
    label: "Shift duration",
    value: 8,
    type: "hours",
    description: "Last shift duration in hours",
    category: "shift",
  },
  {
    id: "no_value",
    label: "",
    value: null,
    type: "",
    description: "",
    category: "",
  },
  {
    id: "unexplained",
    label: "Unexplained downtime",
    value: 180,
    type: "secs",
    description: "The downtime (in seconds) caused by undocumented reasons",
    category: "downtime",
  },
  {
    id: "mech_problems",
    label: "Mechanical problems",
    value: 1210,
    type: "secs",
    description: "The downtime (in seconds) caused by mechanical problems",
    category: "downtime",
  },
] as MetricsData[];
