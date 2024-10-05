import { Card } from '../../../components/ui/card';

export default function StatisticSections() {
  return (
    <section className="flex justify-between space-x-3 ">
      <Card className="flex flex-col items-stretch border p-0 sm:flex-row w-full ">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <span className="text-xs text-muted-foreground self-start">
            Jumlah User
          </span>
          <span className="text-lg font-bold leading-none sm:text-3xl place-self-end">
            3000
          </span>
        </div>
      </Card>
      <Card className="flex flex-col items-stretch border p-0 sm:flex-row w-full ">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <span className="text-xs text-muted-foreground self-start">
            Pemasukan
          </span>
          <span className="text-lg font-bold leading-none sm:text-3xl place-self-end">
            3000
          </span>
        </div>
      </Card>
      <Card className="flex flex-col items-stretch border p-0 sm:flex-row w-full ">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <span className="text-xs text-muted-foreground self-start">
            Pengeluaran
          </span>
          <span className="text-lg font-bold leading-none sm:text-3xl place-self-end">
            3000
          </span>
        </div>
      </Card>
      <Card className="flex flex-col items-stretch border p-0 sm:flex-row w-full ">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <span className="text-xs text-muted-foreground self-start">
            Total Saldo
          </span>
          <span className="text-lg font-bold leading-none sm:text-3xl place-self-end">
            3000
          </span>
        </div>
      </Card>
    </section>
  );
}
