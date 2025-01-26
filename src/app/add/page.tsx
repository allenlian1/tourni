"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { status, tournament_types } from "@prisma/client";

export default function CreateTournamentPage() {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [capacity, setCapacity] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [tournamentType, setTournamentType] = useState<tournament_types | undefined>(undefined);
  const [status, setStatus] = useState<status | undefined>(undefined);

  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const tournamentData = {
      name,
      sport,
      capacity,
      start_date: startDate,
      end_date: endDate,
      tournament_type: tournamentType,
    };

    try {
      // Make an API call to create the tournament
      const response = await fetch('/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create tournament');
      }

      // Parse the response to get the created tournament
      const tournament = await response.json();

      // Redirect to the dynamic route /tournaments/[id]
      router.push(`/tournaments/${tournament.id}`);
    } catch (error) {
      console.error('Error creating tournament:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="p-4 text-2xl font-bold mb-4">Create Tournament</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Tournament Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter tournament name"
          />
        </div>

        <div>
          <Label htmlFor="sport">Sport</Label>
          <Input
            id="sport"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            placeholder="Enter sport name"
          />
        </div>

        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={capacity ?? ''}
            onChange={(e) => setCapacity(Number(e.target.value))}
            placeholder="Enter capacity"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="max-w-[200px]">
                {startDate ? format(startDate, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col space-y-2">
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="max-w-[200px]">
                {endDate ? format(endDate, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Tournament Type</Label>
          <Select onValueChange={(value: tournament_types) => setTournamentType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select tournament type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single_elimination">Single Elimination</SelectItem>
              <SelectItem value="double_elimination">Double Elimination</SelectItem>
              <SelectItem value="round_robin">Round Robin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit">Create Tournament</Button>
      </form>
    </div>
  );
}