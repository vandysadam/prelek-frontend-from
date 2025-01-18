import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Definisikan tipe data transaksi
type Transaksi = {
    tanggal: string;
    uraian: string | null;
    jenis_transaksi: string;
    total_pemasukan: number;
    total_pengeluaran: number;
    bulan: string;
  };

type ReportPDFProps = {
    transaksiByBulan: Record<string, Transaksi[]>;
    tahun: string;
    totalPemasukan: number;
    totalPengeluaran: number;
};

// Gaya untuk PDF
const styles = StyleSheet.create({
  page: { padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#000", paddingVertical: 5 },
  headerRow: { flexDirection: "row", borderBottomWidth: 2, borderColor: "#000", paddingVertical: 5 },
  cellNo: { flex: 0.5, textAlign: "center", fontSize: 12 },
  cellBulan: { flex: 2, fontSize: 12 },
  cellJumlah: { flex: 1.5, textAlign: "right", fontSize: 12 },
  totalRow: { flexDirection: "row", marginTop: 10, borderTopWidth: 2, borderColor: "#000", paddingTop: 10 },
  cellTotalLabel: { flex: 2.5, fontSize: 12, fontWeight: "bold" },
  cellTotalValue: { flex: 1.5, textAlign: "right", fontSize: 12, fontWeight: "bold" },
});
const bulanOrder = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
// Komponen PDF
const ReportPDFTotal: React.FC<ReportPDFProps> = ({ transaksiByBulan, tahun, totalPemasukan, totalPengeluaran }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Judul Laporan */}
      <Text style={styles.title}>Laporan Keuangan Tahun {tahun}</Text>

      {/* Header Tabel */}
      <View style={styles.headerRow}>
        <Text style={styles.cellNo}>No</Text>
        <Text style={styles.cellBulan}>Bulan</Text>
        <Text style={styles.cellJumlah}>Pemasukan</Text>
        <Text style={styles.cellJumlah}>Pengeluaran</Text>
      </View>
      {bulanOrder.map((kelompok, index) => {
        const bulanFormatted = `${kelompok} ${tahun}`;
        const transaksiBulanIni = transaksiByBulan[bulanFormatted] || [];
        // Hitung total pemasukan dan pengeluaran per bulan
        const totalBulanPemasukan = transaksiBulanIni.reduce((total, item) => {
        const pemasukan = parseFloat(item.total_pemasukan.toString());
        return total + (isNaN(pemasukan) ? 0 : pemasukan);
        }, 0);

        const totalBulanPengeluaran = transaksiBulanIni.reduce((total, item) => {
        const pengeluaran = parseFloat(item.total_pengeluaran.toString());
        return total + (isNaN(pengeluaran) ? 0 : pengeluaran);
        }, 0);
                       // Tampilkan baris data untuk bulan ini
    return (
        <tr key={kelompok}>
            <View key={index} style={styles.row}>
                <Text style={styles.cellNo}>{index + 1}</Text>
                <Text style={styles.cellBulan}>{kelompok}</Text>
                <Text style={styles.cellJumlah}>Rp {totalBulanPemasukan.toLocaleString()}</Text>
                <Text style={styles.cellJumlah}>Rp {totalBulanPengeluaran.toLocaleString()}</Text>
            </View>
        </tr>
    );
    })}
      
      <View style={styles.totalRow}>
        <Text style={styles.cellTotalLabel}>Total</Text>
        <Text style={styles.cellTotalValue}>Rp {totalPemasukan.toLocaleString()}</Text>
        <Text style={styles.cellTotalValue}>Rp {totalPengeluaran.toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
);

export default ReportPDFTotal;
