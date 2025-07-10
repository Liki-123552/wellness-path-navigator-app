
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dumbbell, Clock, Target, Users } from 'lucide-react';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  benefits: string[];
}

interface WorkoutPlan {
  name: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
}

const WorkoutPlanner = () => {
  const [userProfile, setUserProfile] = useState({
    age: '',
    weight: '',
    height: '',
    fitnessLevel: '',
    goals: '',
    availableTime: ''
  });

  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);

  const workoutPlans: WorkoutPlan[] = [
    {
      name: "Beginner Full Body",
      description: "Perfect for those starting their fitness journey",
      duration: "30-45 minutes",
      difficulty: "beginner",
      exercises: [
        {
          name: "Push-ups",
          sets: "3",
          reps: "8-12",
          duration: "2-3 minutes",
          difficulty: "beginner",
          equipment: ["bodyweight"],
          benefits: ["chest strength", "arm strength"]
        },
        {
          name: "Squats",
          sets: "3",
          reps: "10-15",
          duration: "3-4 minutes",
          difficulty: "beginner",
          equipment: ["bodyweight"],
          benefits: ["leg strength", "core stability"]
        },
        {
          name: "Plank",
          sets: "3",
          reps: "30-60 seconds",
          duration: "2-3 minutes",
          difficulty: "beginner",
          equipment: ["bodyweight"],
          benefits: ["core strength", "stability"]
        }
      ]
    },
    {
      name: "Intermediate Strength",
      description: "Build muscle and increase strength",
      duration: "45-60 minutes",
      difficulty: "intermediate",
      exercises: [
        {
          name: "Deadlifts",
          sets: "4",
          reps: "6-8",
          duration: "5-6 minutes",
          difficulty: "intermediate",
          equipment: ["barbell", "weights"],
          benefits: ["full body strength", "posterior chain"]
        },
        {
          name: "Bench Press",
          sets: "4",
          reps: "8-10",
          duration: "5-6 minutes",
          difficulty: "intermediate",
          equipment: ["barbell", "bench"],
          benefits: ["chest strength", "shoulder stability"]
        },
        {
          name: "Pull-ups",
          sets: "3",
          reps: "5-8",
          duration: "4-5 minutes",
          difficulty: "intermediate",
          equipment: ["pull-up bar"],
          benefits: ["back strength", "arm strength"]
        },
        {
          name: "Overhead Press",
          sets: "3",
          reps: "8-10",
          duration: "4-5 minutes",
          difficulty: "intermediate",
          equipment: ["barbell", "dumbbells"],
          benefits: ["shoulder strength", "core stability"]
        },
        {
          name: "Bulgarian Split Squats",
          sets: "3",
          reps: "10-12 each leg",
          duration: "5-6 minutes",
          difficulty: "intermediate",
          equipment: ["bench", "dumbbells"],
          benefits: ["leg strength", "balance"]
        }
      ]
    }
  ];

  const handleProfileSubmit = () => {
    // Simple logic to recommend a plan based on fitness level
    const recommendedPlan = userProfile.fitnessLevel === 'beginner' 
      ? workoutPlans[0] 
      : workoutPlans[1];
    setSelectedPlan(recommendedPlan);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Personalized Workout Plans</h2>
        <p className="text-gray-600">Get a custom workout plan tailored to your fitness goals</p>
      </div>

      {!selectedPlan ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Tell Us About Yourself
            </CardTitle>
            <CardDescription>We'll create a personalized workout plan based on your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g., 25"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile({...userProfile, age: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={userProfile.weight}
                  onChange={(e) => setUserProfile({...userProfile, weight: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 175"
                  value={userProfile.height}
                  onChange={(e) => setUserProfile({...userProfile, height: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="fitness-level">Fitness Level</Label>
                <Select onValueChange={(value) => setUserProfile({...userProfile, fitnessLevel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="goals">Primary Goal</Label>
                <Select onValueChange={(value) => setUserProfile({...userProfile, goals: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                    <SelectItem value="general-fitness">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time">Available Time (minutes)</Label>
                <Select onValueChange={(value) => setUserProfile({...userProfile, availableTime: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90+ minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleProfileSubmit} className="w-full" size="lg">
              Get My Workout Plan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-blue-600" />
                    {selectedPlan.name}
                  </CardTitle>
                  <CardDescription>{selectedPlan.description}</CardDescription>
                </div>
                <Badge variant="outline" className="capitalize">
                  {selectedPlan.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedPlan.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedPlan.exercises.length} exercises
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {selectedPlan.exercises.map((exercise, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{exercise.name}</h3>
                    <Badge variant="secondary" className="capitalize">
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">Sets:</span>
                      <p className="font-medium">{exercise.sets}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Reps:</span>
                      <p className="font-medium">{exercise.reps}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <p className="font-medium">{exercise.duration}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Equipment: </span>
                      {exercise.equipment.map((item, i) => (
                        <Badge key={i} variant="outline" className="text-xs mr-1">
                          {item}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Benefits: </span>
                      {exercise.benefits.map((benefit, i) => (
                        <Badge key={i} variant="secondary" className="text-xs mr-1">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            onClick={() => setSelectedPlan(null)} 
            variant="outline" 
            className="w-full"
          >
            Create New Plan
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;
