import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type CustomCardProps = {
    title: string;
    description?: string;
    content: string;
    footer?: string;
  };



const CustomCard : React.FC<CustomCardProps> = ({ title, description, content, footer }) => {
    const [year, setYear] = useState(new Date().getFullYear().toString());
    // const { data } = useGetPemasukanQuery(year);
    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const startYear = 2023;
        let years = [];
        for (let i = startYear; i <= currentYear; i++) {
            years.push(i.toString());
        }      
        return years;
      };



  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-15 px-3 py-1 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-muted dark:border-gray-700 dark:text-muted-foreground dark:focus:ring-muted dark:focus:border-muted"
        >
          {generateYearOptions().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        
        <div className="flex items-center gap-2">
          <Button>
          <Link
            className=" "
            to={`/activities/report/${year}`}  // Gunakan Link untuk navigasi dinamis
          >
            Export
          </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      {footer && (
        <CardFooter>
          <p>{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default CustomCard;


