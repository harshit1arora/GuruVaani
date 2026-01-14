import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ThumbsUp, Send } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePeerWisdom } from "@/hooks/usePeerWisdom";
import { useSystemInsights } from "@/hooks/useSystemInsights";

const PeerWisdom = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { logInsight } = useSystemInsights();
  const { 
    posts, 
    addPost, 
    togglePostExpansion, 
    updateNewResponse, 
    addResponse, 
    toggleHelpful 
  } = usePeerWisdom();
  
  // State
  const [newQuestion, setNewQuestion] = useState("");

  // Handlers
  const handlePostQuestion = () => {
    if (newQuestion.trim()) {
      addPost(newQuestion);
      // Log insight: Question posted
      logInsight('peer-wisdom', 'post-question', {
        questionLength: newQuestion.length.toString()
      });
      setNewQuestion("");
    }
  };

  const handleResponseChange = (postId: string, value: string) => {
    updateNewResponse(postId, value);
  };

  const handlePostResponse = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post && post.newResponse.trim()) {
      addResponse(postId, post.newResponse);
      // Log insight: Response posted
      logInsight('peer-wisdom', 'post-response', {
        responseLength: post.newResponse.length.toString()
      });
    }
  };

  return (
    <div className="app-container pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center">
        <button
          onClick={() => navigate("/home")}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="ml-2">
          <h1 className="text-lg font-semibold text-foreground">
            {t.peerWisdom.title}
          </h1>
          <p className="text-xs text-muted-foreground">
            {t.peerWisdom.subtitle}
          </p>
        </div>
      </header>

      {/* Ask Question Section */}
      <section className="px-5 mb-6">
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {t.peerWisdom.askQuestion}
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">
                {t.peerWisdom.yourQuestion}
              </label>
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder={t.peerWisdom.questionPlaceholder}
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
              />
            </div>
            <button
              onClick={handlePostQuestion}
              disabled={!newQuestion.trim()}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                newQuestion.trim() 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {t.peerWisdom.postQuestion}
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="px-5 space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t.peerWisdom.posts}
        </h2>
        
        {posts.length === 0 ? (
          <div className="bg-secondary/50 rounded-xl p-8 text-center">
            <p className="text-muted-foreground">
              {t.peerWisdom.noPosts}
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              {/* Post Header */}
              <div 
                className="p-4 cursor-pointer" 
                onClick={() => togglePostExpansion(post.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      {post.author} {t.peerWisdom.from} {post.location} • {post.createdAt}
                    </p>
                    <h3 className="text-foreground font-medium">
                      {post.question}
                    </h3>
                  </div>
                  <div className="text-sm text-muted-foreground ml-2">
                    {post.responses.length} {t.peerWisdom.responses}
                  </div>
                </div>
              </div>

              {/* Responses */}
              {post.isExpanded && (
                <div className="border-t border-border">
                  {/* Response List */}
                  <div className="p-4 space-y-4">
                    {post.responses.map((response) => (
                      <div key={response.id} className="space-y-2">
                        <div className="flex justify-between items-start">
                          <p className="text-xs text-muted-foreground">
                            {response.author} {t.peerWisdom.from} {response.location} • {response.createdAt}
                          </p>
                          <button
                            onClick={() => toggleHelpful(post.id, response.id)}
                            className={`flex items-center gap-1 text-xs transition-colors ${
                              response.isHelpful 
                                ? "text-primary"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                          >
                            <ThumbsUp 
                              className={`w-3.5 h-3.5 ${
                                response.isHelpful ? "fill-primary" : ""
                              }`} 
                            />
                            <span>{response.helpfulCount} {t.peerWisdom.helpful}</span>
                          </button>
                        </div>
                        <p className="text-sm text-foreground">
                          {response.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Add Response */}
                  <div className="border-t border-border p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2">
                      {t.peerWisdom.addResponse}
                    </h3>
                    <div className="space-y-3">
                      <textarea
                        value={post.newResponse}
                        onChange={(e) => handleResponseChange(post.id, e.target.value)}
                        placeholder={t.peerWisdom.responsePlaceholder}
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        rows={2}
                      />
                      <button
                        onClick={() => handlePostResponse(post.id)}
                        disabled={!post.newResponse.trim()}
                        className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm ${
                          post.newResponse.trim() 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        {t.peerWisdom.postResponse}
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <BottomNav />
    </div>
  );
};

export default PeerWisdom;
