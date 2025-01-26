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
        <TabsTrigger value="teams">Teams</TabsTrigger>
        <TabsTrigger value="livestream">Livestream</TabsTrigger>

      </TabsList>

      <TabsContent value="bracket">
        <Card>
          <CardContent className="flex flex-col h-[calc(100vh-4rem)] min-w-[800px] min-h-[400px] overflow-auto p-4 relative">
            
            <Bracket />

          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="player">
        <Card>
          <CardContent className="flex flex-col h-[calc(100vh-4rem)] min-w-[800px] min-h-[400px] overflow-auto p-4 relative">
            
            players

          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="livestream">
        <Card>
          <CardContent className="flex flex-col h-[calc(100vh-4rem)] min-w-[800px] min-h-[400px] overflow-auto p-4 relative">
            
            livestream

          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
