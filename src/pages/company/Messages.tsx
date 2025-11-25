import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";

type Message = { id: string; from: "company" | "university"; text: string; time: string };
type Conversation = { id: string; university: string; verified?: boolean; messages: Message[] };

const STORAGE_KEY = "company_university_conversations_v1";

// some mock universities / seed conversations
const defaultConversations: Conversation[] = [
  {
    id: "u-1",
    university: "มหาวิทยาลัยตัวอย่าง",
    verified: true,
    messages: [
      { id: "m-1", from: "university", text: "สวัสดีครับ บริษัท A — เราสนใจรายละเอียดโครงการฝึกงาน", time: new Date().toISOString() },
      { id: "m-2", from: "company", text: "สวัสดีครับ ทางเรายินดีให้ข้อมูลเพิ่มเติม แจ้งความต้องการได้เลย", time: new Date().toISOString() },
    ],
  },
  {
    id: "u-2",
    university: "มหาวิทยาลัยเทคโน",
    verified: false,
    messages: [
      { id: "m-3", from: "university", text: "ต้องการข้อมูลเกี่ยวกับการมาฝึกงานของนักศึกษา", time: new Date().toISOString() },
    ],
  },
];

const nowTime = () => new Date().toISOString();
const uid = (p = "") => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}${p}`;

export default function CompanyMessages() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Conversation[];
    } catch {}
    return defaultConversations;
  });
  const [selectedId, setSelectedId] = useState<string | null>(() => (conversations[0]?.id ?? null));
  const [compose, setCompose] = useState("");
  const [search, setSearch] = useState("");

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch {}
  }, [conversations]);

  const selected = useMemo(() => conversations.find(c => c.id === selectedId) || null, [conversations, selectedId]);

  const sendMessage = () => {
    if (!selected) {
      toast.error("กรุณาเลือกมหาวิทยาลัยก่อนส่งข้อความ");
      return;
    }
    const text = compose.trim();
    if (!text) return;
    const newMsg: Message = { id: uid("m"), from: "company", text, time: nowTime() };
    setConversations(prev => prev.map(c => c.id === selected.id ? { ...c, messages: [...c.messages, newMsg] } : c));
    setCompose("");
    toast.success("ส่งข้อความเรียบร้อย");
    // Optionally simulate a reply
    setTimeout(() => {
      setConversations(prev => prev.map(c => {
        if (c.id !== selected.id) return c;
        const reply: Message = { id: uid("r"), from: "university", text: "ขอบคุณครับ/ค่ะ ได้รับข้อความแล้ว เราจะติดต่อกลับ", time: nowTime() };
        return { ...c, messages: [...c.messages, reply] };
      }));
    }, 1200);
  };

  const startNewConversation = (universityName: string) => {
    const exists = conversations.find(c => c.university === universityName);
    if (exists) {
      setSelectedId(exists.id);
      return;
    }
    const c: Conversation = { id: uid("c"), university: universityName, verified: false, messages: [{ id: uid("m"), from: "company", text: "สวัสดีครับ/ค่ะ เราอยากติดต่อเรื่องการรับนักศึกษาฝึกงาน", time: nowTime() }] };
    setConversations(prev => [c, ...prev]);
    setSelectedId(c.id);
    toast.success("เริ่มการสนทนากับมหาวิทยาลัยใหม่");
  };

  const filtered = conversations.filter(c => c.university.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">ติดต่อมหาวิทยาลัย</h1>
              <p className="text-muted-foreground">ส่งข้อความถึงหน่วยงานมหาวิทยาลัยเพื่อหารือเกี่ยวกับการรับนักศึกษาฝึกงาน</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/company/dashboard')}>กลับไปยังแดชบอร์ด</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: conversations list */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>รายชื่อมหาวิทยาลัย</CardTitle>
                <CardDescription>ค้นหาและเลือกเพื่อสนทนา</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="ค้นหามหาวิทยาลัย..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  <Button onClick={() => { if (!search.trim()) return toast.error("กรุณาใส่ชื่อมหาวิทยาลัยเพื่อเริ่มสนทนา"); startNewConversation(search.trim()); setSearch(""); }}>เริ่ม</Button>
                </div>

                <div className="max-h-[60vh] overflow-auto space-y-2">
                  {filtered.length === 0 ? (
                    <div className="text-sm text-muted-foreground">ไม่พบมหาวิทยาลัย</div>
                  ) : filtered.map(conv => {
                    const last = conv.messages[conv.messages.length - 1];
                    return (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedId(conv.id)}
                        className={`w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors flex items-start gap-3 ${selectedId === conv.id ? "bg-muted/50 ring-1 ring-primary/40" : ""}`}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{conv.university.slice(0,1)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{conv.university}</div>
                            {conv.verified ? <Badge className="text-xs">ยืนยัน</Badge> : null}
                          </div>
                          <div className="text-sm text-muted-foreground ">{last?.text ?? "ไม่มีข้อความ"}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{new Date(last?.time ?? Date.now()).toLocaleDateString()}</div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: chat */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selected ? selected.university : "เลือกมหาวิทยาลัยเพื่อเริ่มสนทนา"}</CardTitle>
                    <CardDescription>{selected ? `${selected.messages.length} ข้อความ` : "ไม่มีการสนทนา"}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {selected?.verified ? <Badge className="text-sm">ยืนยันโดยมหาวิทยาลัย</Badge> : null}
                    <Button variant="ghost" onClick={() => {
                      if (!selected) return;
                      setConversations(prev => prev.filter(c => c.id !== selected.id));
                      setSelectedId(prev => {
                        const remain = conversations.filter(c => c.id !== selected.id);
                        return remain[0]?.id ?? null;
                      });
                      toast.success("ลบการสนทนาแล้ว");
                    }}>ลบการสนทนา</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4 max-h-[60vh] overflow-auto flex flex-col gap-3">
                  {selected ? (
                    selected.messages.map(m => (
                      <div key={m.id} className={`max-w-[80%] ${m.from === "company" ? "self-end bg-primary/10 text-right" : "self-start bg-muted/10 text-left"} p-3 rounded-md`}>
                        <div className="text-sm">{m.text}</div>
                        <div className="text-xs text-muted-foreground mt-1">{new Date(m.time).toLocaleString()}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">โปรดเลือกมหาวิทยาลัยจากรายการด้านซ้าย</div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  <Textarea
                    value={compose}
                    onChange={(e) => setCompose(e.target.value)}
                    placeholder={selected ? `ส่งข้อความถึง ${selected.university}...` : "เลือกมหาวิทยาลัยก่อนส่งข้อความ"}
                    className="flex-1"
                    rows={3}
                    disabled={!selected}
                  />
                  <div className="flex flex-col gap-2 md:w-40">
                    <Button className="w-full" onClick={sendMessage} disabled={!selected || !compose.trim()}>
                      <span className="flex items-center gap-2 justify-center"><Send className="h-4 w-4" /> ส่งข้อความ</span>
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => { setCompose(""); }}>
                      ยกเลิก
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
