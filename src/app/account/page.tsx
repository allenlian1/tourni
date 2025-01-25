import { auth } from "@/auth";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { logout } from "@/lib/actions/auth";

export default async function AccountPage() {
  const session = await auth();
    return (
      <div>
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-3xl">
          Account
        </h1>
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              <TableRow>
                <TableCell className="font-medium">Data 1</TableCell>
                <TableCell>Data 2</TableCell>
                <TableCell>Data 3</TableCell>
                <TableCell className="text-right">Data 4</TableCell>
              </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Button variant="destructive" onClick={logout}>Sign Out</Button>
      </div>
    );
  }