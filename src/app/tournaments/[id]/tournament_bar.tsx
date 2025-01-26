import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Bracket from "@/temp_bracket"

export function TournamentTable() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="bracket">Bracket</TabsTrigger>
        <TabsTrigger value="players">Players</TabsTrigger>
        <TabsTrigger value="livestream">Livestream</TabsTrigger>
      </TabsList>

      <TabsContent value="bracket">
            <Bracket />
      </TabsContent>

      <TabsContent value="players">
            players
      </TabsContent>

      <TabsContent value="livestream">
            livestream
      </TabsContent>
    </Tabs>
  )
}
