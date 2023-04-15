const prontuaryObject = {
  table_id: 0,
  user_id: 0,
  title: "",
  json_path: "string",
};
export type ProntuaryObject = typeof prontuaryObject;

class Prontuary {
  patient_name: String;
  patient_data: ProntuaryObject;

  constructor(patient_name: string, patient_data: ProntuaryObject) {
    this.patient_name = patient_name;
    this.patient_data = patient_data;
  }
}

export default Prontuary