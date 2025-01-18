import DashboardLayout from "@/layouts/dasboard-layout";
import { useGetPengeluaranQuery } from "../../../modules/users/api/user.api";
import { useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportPDF from "./export-pdf/export-pdf-pengeluaran";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Transaksi = {
    tanggal: string;
    uraian: string | null;
    jenis_transaksi: string;
    total_pengeluaran: number;
    bulan: string;
}


    const ReportPagePengeluaran : React.FC = () => {
        const { year } = useParams<{ year: string }>();
        console.log('ini isi dari id ', year);
        const tahun : string = year!;

        const { data, error, isLoading } = useGetPengeluaranQuery(tahun);
        console.log('data dari api ', data)
        console.log("Year parameter: ", tahun);

    if(isLoading){
        return (
            <DashboardLayout>
                <h1>Loading...</h1>
            </DashboardLayout>
        );
    }
    if (error) {
        return (
          <DashboardLayout>
            <h1>Error fetching data</h1>
          </DashboardLayout>
        );
      }
      // const transaksi = Array.isArray(data?.data) ? data.data : [];
      const transaksi: Transaksi[] = Array.isArray(data?.data) ? data.data : [];

      const transaksiByBulan = transaksi.reduce((acc: Record<string, Transaksi[]>, item: Transaksi) => {
        // const kelompok = item.bulan;
        const bulan = new Date(item.bulan).toLocaleString("id-ID", { month: "long", year: "numeric" });
        if (!acc[bulan]) {
          acc[bulan] = [];
        }
        acc[bulan].push(item);
        return acc;
      }, {});
    
      const bulanOrder = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];


    const totalTahun = Object.values(transaksiByBulan).reduce((total, transaksiBulanIni) => {
      return total + transaksiBulanIni.reduce((bulanTotal, item) => {
        const pemasukan = parseFloat(item.total_pengeluaran.toString());
        return bulanTotal + (isNaN(pemasukan) ? 0 : pemasukan);
      }, 0);
    }, 0);

      
        
 
      
    return (
        <DashboardLayout>
          <Card>  
            <CardHeader>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Report Page Pengeluaran Tahun {tahun}</h1>
                    <PDFDownloadLink
                        document={<ReportPDF transaksiByBulan={transaksiByBulan} tahun={tahun} totalTahun={totalTahun} />}
                        fileName={`Laporan_Pengeluaran_${tahun}.pdf`}
                        className="btn btn-primary">
                        <Button className="px-4 py-2  text-white ">
                            Download Laporan
                        </Button>
                    </PDFDownloadLink>
              </div>
            </CardHeader> 
            <CardContent>
              <div>
                  {bulanOrder.map((kelompok) => {
                      const bulanFormatted = `${kelompok} ${tahun}`;
                      const transaksiBulanIni = transaksiByBulan[bulanFormatted] || [];
                      const totalBulan = transaksiBulanIni.reduce((total, item) => {
                      
                        const pemasukan = parseFloat(item.total_pengeluaran.toString()); 
                        return total + (isNaN(pemasukan) ? 0 : pemasukan); 
                      }, 0);
                      console.log("Total Pemasukan untuk bulan ini:", totalBulan); 

                        console.log('transaksiBulanIni', kelompok);
                return (
                  <div key={kelompok}>
                    {transaksiBulanIni.length > 0 && (
                      <>
                        <h3 className="text-lg font-bold mt-4 mb-2">
                        {kelompok}
                        </h3> 
                        <table className="table-auto w-full border-collapse border">
                          <thead>
                            <tr>
                              <th className="border px-4 py-2">No</th>
                              <th className="border px-4 py-2">Tanggal</th>
                              <th className="border px-4 py-2">Uraian</th>
                              <th className="border px-4 py-2">Jenis Transaksi</th>
                              <th className="border px-4 py-2">Jumlah</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transaksiBulanIni.map((item, index) => (
                              <tr key={index}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{item.tanggal}</td>
                                <td className="border px-4 py-2 text-center">{item.uraian ?? '-'}</td>
                                <td className="border px-4 py-2">{item.jenis_transaksi}</td>
                                <td className="border px-4 py-2">Rp {item.total_pengeluaran}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-4 px-40 text-right text-xl">
                          <span>Total Pengeluaran {kelompok} : Rp {totalBulan}</span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
              </div>
              <div className="mt-4 px-40 text-right text-xl">
                <span>Total Pengeluaran Tahun {tahun} : Rp {totalTahun.toLocaleString()}</span>
              </div>
          </CardContent>         
        </Card>
      </DashboardLayout>
    );
  };

export default ReportPagePengeluaran;