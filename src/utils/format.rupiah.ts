export const formatRupiah = (value: number) => {
  return `Rp. ${value.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};
