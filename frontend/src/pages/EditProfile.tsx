import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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


export default function EditProfilePage() {


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
          <h1 className="text-3xl font-bold">Edit My Profile</h1>
          <p className="text-muted-foreground text-sm">
            Edit your profile information and details
          </p>
        </div>
        <div className=" flex gap-4">

                            <Link to="/profile">
      <Button variant="outline">Cancel</Button>
      </Link>
                      <Link to="/profile">
      <Button>Update</Button>
      </Link>
        </div>

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
              <Input value={profile[0]?.first_name || "John"}  />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input value={profile[0]?.last_name || "Doe"}  />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={profile[0]?.email || "john.doe@university.edu"}  />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={profile[0]?.phone || "+1 (555) 123-4567"}  />
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label>Position Looking</Label>
              <Input value={profile[0]?.position || "Software Engineer"}  />
            </div>

            {/* Available Start Date */}
            <div className="space-y-2">
              <Label>Available Start Date</Label>
              <Input type="date" value={profile[0]?.available_start_date || "2024-01-01"}  />
            </div>
            {/* Employment Status */}
             <div>
              <Label className="mb-2">Employment Status</Label>
              <Select defaultValue={profile[0]?.employment_status || "Unemployed"} >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
    <SelectItem value="Employed">Employed</SelectItem>
                  <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                  <SelectItem value="Unemployed">Unemployed</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
            </div>
          </div>
          
        </CardContent>
      </Card>

     
    </div>
  )
}