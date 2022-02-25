import * as XLSX from "xlsx";

type Datas = { [key: string]: string }[];
const wscols = [{ wch: 10 }, { wch: 20 }, { wch: 10 }, { wch: 30 }];
const ROW = ["REF", "Title", "Price", "Description"];

//
async function saveInformations({
  datas,
  folder,
}: {
  datas: Datas;
  folder: string;
}) {
  const rows = datas.map((e) => [e.reference, e.title, e.price, e.description]);
  rows.unshift(ROW);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  ws["!cols"] = wscols;
  XLSX.utils.book_append_sheet(wb, ws);
  XLSX.writeFile(wb, `public/${folder}/informations.xlsx`);
}

export default saveInformations;
