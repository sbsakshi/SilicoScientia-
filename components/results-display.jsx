"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export function ResultsDisplay({ title, results, isLoading = false }) {
  const [isVisible, setIsVisible] = useState(false)

  if (isLoading) {
    return (
      <Card className="w-full bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006F7F]"></div>
        </CardContent>
      </Card>
    )
  }

  if (!results || results.length === 0) {
    return null
  }

  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Hide Results" : "Show Results"}
        </Button>
      </CardHeader>
      {isVisible && (
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(results[0]).map((key) => (
                    <TableHead key={key}>{key}</TableHead>
                  ))}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    {Object.values(result).map((value, i) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

