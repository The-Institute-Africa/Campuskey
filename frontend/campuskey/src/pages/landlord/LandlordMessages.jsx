import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MessageSquare } from "lucide-react";

import {useAuth}   from '@/pages/auth/api/store/auth.store';

const messages = [
  {
    id: 1,
    studentName: "Alice Johnson",
    propertyName: "Campus View Apartment",
    message: "Hi! I'm interested in viewing this property. Is it still available?",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    studentName: "Bob Smith",
    propertyName: "Downtown Studio",
    message: "Can you tell me more about the utilities included?",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 3,
    studentName: "Carol White",
    propertyName: "Campus View Apartment",
    message: "What's the lease duration and when is the earliest move-in date?",
    time: "2 days ago",
    unread: false,
  },
];

const LandlordMessages = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link to="/landlord">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {messages.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">No messages yet</h3>
            <p className="text-muted-foreground">
              When students message you about your properties, they'll appear here
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <Card
                key={msg.id}
                onClick={() => navigate(`/landlord/messages/${msg.id}`)}
                className={`cursor-pointer p-6 transition-all hover:shadow-card-hover ${
                  msg.unread ? "border-primary/50 bg-primary/5" : ""
                }`}
              >
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {msg.studentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-1 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{msg.studentName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {msg.propertyName}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-muted-foreground">{msg.message}</p>
                    {msg.unread && (
                      <span className="mt-2 inline-block rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LandlordMessages;
