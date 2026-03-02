
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

import axios from "axios";
import { useEffect, useState } from "react";

type profile = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  position: string;
  available_start_date: string;
  employment_status: string;
};


export default function ProfilePage() {



 const [profile, setProfile] = useState<profile[]>([]);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get<profile[]>("http://localhost:5000/api/profiles");
       setProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  fetchProfile();
}, []);

    
  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Header */}
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground text-sm ">
            View your profile information and details
          </p>
        </div>

        <Link to={`/editprofile`}>
      <Button>Edit Profile</Button>
      </Link>
      </div>

      {/* Personal Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>My Personal Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* First Name */}
            <div className="space-y-2">
              <Label>First Name</Label>
              <p className="text-sm text-gray-500">{profile[0]?.first_name || "N/A"}</p>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label>Last Name</Label>
              <p className="text-sm text-gray-500">{profile[0]?.last_name || "N/A"}</p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <p className="text-sm text-gray-500">
                {profile[0]?.email || "N/A"}
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>Phone</Label>
              <p className="text-sm text-gray-500">
                {profile[0]?.phone || "N/A"}
              </p>
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label>Position Looking</Label>
              <p className="text-sm text-gray-500">
                {profile[0]?.position || "N/A"}
              </p>
            </div>

            {/* Available Start Date */}
            <div className="space-y-2">
              <Label>Available Start Date</Label>
              <p className="text-sm text-gray-500">
                {profile[0]?.available_start_date || "N/A"}
              </p>
            </div>

            {/* Employment Status */}
            <div className="space-y-2">
              <Label>Employment Status</Label>
              <p className="text-sm text-gray-500">
                {profile[0]?.employment_status || "N/A"}
              </p>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}