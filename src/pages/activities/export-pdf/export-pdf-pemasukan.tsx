import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Definisikan tipe transaksi
type Transaksi = {
  tanggal: string;
  uraian: string | null;
  jenis_transaksi: string;
  total_pemasukan: number;
  bulan: string;
};

type ReportPDFProps = {
  transaksiByBulan: Record<string, Transaksi[]>;
  tahun: string;
  totalTahun: number;
};

// Membuat style untuk PDF
const styles = StyleSheet.create({
  transparant: { fontSize: 10, marginBottom: 10, textAlign: "center" },
  cellNo: { margin: 5, fontSize: 11, flex: 0.2 },
  celltang: { margin: 5, fontSize: 11, flex: 0.6 },
  celluraian: { margin: 5, fontSize: 11, flex: 2, textAlign: "center" },
  celltrans: { margin: 5, fontSize: 11, flex: 1.8 },
  page: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10, textAlign: "center" },
  row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#000", marginBottom: 5 },
  cell: { margin: 5, fontSize: 11, flex: 1 },
  header: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  total: { marginTop: 10, textAlign: "right", fontSize: 14, fontWeight: "bold" },
  section: { marginBottom: 20 },
});

// Komponen PDF
const ReportPDFPemasukan: React.FC<ReportPDFProps> = ({ transaksiByBulan, tahun, totalTahun }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Judul Laporan */}
      <Text style={styles.title}>Laporan Pemasukan Tahun {tahun}</Text>
      <View style={styles.row}/>
      <Text style={styles.transparant}> </Text>

      {/* Loop untuk menampilkan transaksi per bulan */}
      {Object.keys(transaksiByBulan).map((bulan) => {
        const transaksiBulan = transaksiByBulan[bulan];
        
        // Hitung total Pemasukan per bulan
        const totalPerBulan = transaksiBulan.reduce((total, item) => {
          const pemasukan = parseFloat(item.total_pemasukan.toString());
          return total + (isNaN(pemasukan) ? 0 : pemasukan);
        }, 0);

        return (
          <View key={bulan} style={styles.section}>
            {/* Header Bulan */}
            <Text style={styles.header}>Bulan: {bulan}</Text>

            {/* Header Tabel */}
            <View style={styles.row}>
              <Text style={[styles.cellNo, { fontWeight: "bold" }]}>No</Text>
              <Text style={[styles.celltang, { fontWeight: "bold" }]}>Tanggal</Text>
              <Text style={[styles.celluraian, { fontWeight: "bold" }]}>Uraian</Text>
              <Text style={[styles.celltrans, { fontWeight: "bold" }]}>Jenis Transaksi</Text>
              <Text style={[styles.cell, { fontWeight: "bold" }]}>Jumlah</Text>
            </View>

            {/* Data Transaksi Per Bulan */}
            {transaksiBulan.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cellNo}>{index + 1}</Text>
                <Text style={styles.celltang}>{item.tanggal}</Text>
                <Text style={styles.celluraian}>{item.uraian ?? "-"}</Text>
                <Text style={styles.celltrans}>{item.jenis_transaksi}</Text>
                <Text style={styles.cell}>Rp {item.total_pemasukan.toLocaleString()}</Text>
              </View>
            ))}

            {/* Total Pemasukan Per Bulan */}
            <Text style={styles.total}>Total Pemasukan {bulan}: Rp {totalPerBulan.toLocaleString()}</Text>
          </View>
        );
      })}
            <View style={styles.row}/>

      {/* Total Pemasukan Tahun */}
      <Text style={styles.total}>Total Pemasukan Tahun {tahun}: Rp {totalTahun.toLocaleString()}</Text>
    </Page>
  </Document>
);

export default ReportPDFPemasukan;
