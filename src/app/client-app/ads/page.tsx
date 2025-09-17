import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ads = [
  { id: 1, title: "Summer Sale Banner", status: "Active", clicks: 1204, impressions: 45032 },
  { id: 2, title: "New Product Launch", status: "Active", clicks: 2345, impressions: 87654 },
  { id: 3, title: "Holiday Promotion", status: "Inactive", clicks: 543, impressions: 21098 },
  { id: 4, title: "Flash Discount Ad", status: "Expired", clicks: 3456, impressions: 120456 },
];

export default function AdsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
       <div className="flex items-center justify-between">
        <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Ads Management</h1>
            <p className="text-muted-foreground">Create, monitor, and manage your ad campaigns.</p>
        </div>
        <Button>
            <PlusCircle />
            <span>Create New Ad</span>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.title}</TableCell>
                  <TableCell>
                    <Badge variant={ad.status === 'Active' ? 'default' : 'secondary'}>
                      {ad.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{ad.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{ad.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
