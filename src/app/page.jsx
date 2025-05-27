import { Button } from "@/components/ui/button";
import { MailOpen } from "lucide-react";
import InputDemo from "@/app/components/email_input";
import CommandPanel from "@/app/components/commandpanel";
import TextareaWithButton from "@/app/components/textarea";

export default function Home() {
  return (
    <div className="p-6 space-y-1">
      <h1 className="mb-6 text-2xl font-bold">Hello World</h1>

      <CommandPanel className="mb-8" />
      <InputDemo className="mb-8"/>

      <Button className="bg-green-600 hover:bg-green-700 text-white">
        <MailOpen /> Share with Email
      </Button>

      <div>
        <Button  className="mb-8" variant="destructive">Exit</Button>
      </div>
    <div></div>
      <TextareaWithButton />
    </div>
  );
}
