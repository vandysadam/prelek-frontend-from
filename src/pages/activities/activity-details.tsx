import DashboardLayout from "@/layouts/dasboard-layout";
import React from "react";
import { useParams } from "react-router-dom";

export default function ActivityDetails() {
   
        const { activity_id } = useParams<{ activity_id: string }>();
    
    return (
        <DashboardLayout>
            <div>ActivityDetails</div>

        </DashboardLayout>
    );
};

