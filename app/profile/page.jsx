"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Camera, Check, LogOut } from "lucide-react"

export default function Profile() {
  const [date, setDate] = useState(new Date(1990, 2, 15))

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="  backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
          <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-[#006F7F]">
                  <AvatarImage src="/placeholder-user.jpg" alt="Profile picture" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#006F7F]">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold flex items-center gap-1">
                  Sarah Johnson <Check className="h-4 w-4 text-blue-500" />
                </h3>
                <p className="text-sm text-muted-foreground">Medical Researcher</p>
              </div>
            </div>

            <div className="flex-1 grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <Input defaultValue="@sarahjohnson" className="bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <Select defaultValue="us">
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input defaultValue="sarah.johnson@research.med" className="bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <Select defaultValue="female">
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input defaultValue="+1 (555) 123-4567" className="bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-white">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <Textarea
                  className="min-h-[100px] bg-white"
                  defaultValue="Dedicated medical researcher with 10+ years of experience in pharmaceutical development and clinical trials. Passionate about advancing healthcare through innovative research methodologies."
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Social Links</h3>
                <div className="flex gap-2">
                  {/* <Button variant="outline" size="icon" className="rounded-full bg-white">
                    <Linkedin className="h-4 w-4 text-[#0077B5]" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-white">
                    <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                  </Button> */}
                  <Button variant="outline" size="icon" className="rounded-full bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-[#8A3AB9]"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#006F7F] hover:bg-[#006F7F]/90">Save Changes</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

