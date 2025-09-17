import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Copy } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

const promocodes = [
  { id: 1, code: "SUMMER25", discount: "25%", status: "Active", expiry: new Date('2024-08-31'), uses: 152 },
  { id: 2, code: "WELCOME10", discount: "10%", status: "Active", expiry: new Date('2024-12-31'), uses: 891 },
  { id: 3, code: "FLASH50", discount: "50%", status: "Expired", expiry: new Date('2024-05-20'), uses: 200 },
  { id: 4, code: "SHIPFREE", discount: "Free Shipping", status: "Inactive", expiry: new Date('2024-09-30'), uses: 0 },
];

export default function PromocodesPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Promocodes</h1>
            <p className="text-muted-foreground">Manage and create promotional codes for your users.</p>
        </div>
        <Button>
            <PlusCircle />
            <span>Create Promocode</span>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Existing Promocodes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead className="text-right">Uses</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promocodes.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                        <span>{promo.code}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="h-3 w-3" />
                        </Button>
                    </div>
                  </TableCell>
                  <TableCell>{promo.discount}</TableCell>
                  <TableCell>
                    <Badge variant={promo.status === 'Active' ? 'default' : 'outline'}>
                      {promo.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(promo.expiry, 'PPP')}</TableCell>
                  <TableCell className="text-right">{promo.uses.toLocaleString()}</TableCell>
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
