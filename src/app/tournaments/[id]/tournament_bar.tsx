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
import { PlayerSection } from "./player_section"


export function TournamentTable() {
  return (
    <Tabs defaultValue="account">
      <TabsList className="flex w-full flex-wrap sm:flex-nowrap gap-2 justify-center">
        <TabsTrigger value="bracket" className="flex-1 text-center sm:w-auto">
          Bracket
        </TabsTrigger>
        <TabsTrigger value="players" className="flex-1 text-center sm:w-auto">
          Players
        </TabsTrigger>
        <TabsTrigger value="livestream" className="flex-1 text-center sm:w-auto">
          Livestream
        </TabsTrigger>
      </TabsList>

      <TabsContent value="bracket">
        <div>
            <Card>
            <CardContent className="flex flex-col h-[calc(100vh-4rem)] min-w-[800px] min-h-[400px] overflow-auto p-4 relative">
                
                <Bracket />

            </CardContent>
            </Card>
        </div>
        
      </TabsContent>

      <TabsContent value="players">
        <div>
            <Card>
            <CardContent className="flex flex-col h-[calc(100vh-4rem)] min-w-[800px] min-h-[400px] overflow-auto p-4 relative">
                
                <PlayerSection />

            </CardContent>
            </Card>
        </div>
       
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
