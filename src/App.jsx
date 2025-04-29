// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from '@/pages/Home.jsx'; // Using @ alias
// import NotFound from '@/pages/not-found.jsx'; // Using @ alias

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;

import { Switch, Route } from "wouter";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
// function App() {
//   return (  <Switch>
//            <Route path="/" component={Home} />
//           <Route component={NotFound} />
//         </Switch>
//   );
// }

function Router() {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    );
  }
  
  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

export default App;


// import { Switch, Route } from "wouter";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "@/lib/queryClient";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import NotFound from "@/pages/not-found";
// import Home from "@/pages/home"; // Ensure "home.jsx" is correct

// function Router() {
//   return (
//     <Switch>
//       <Route path="/" component={Home} />
//       <Route component={NotFound} />
//     </Switch>
//   );
// }

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Router />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;

// import { Routes, Route } from "react-router-dom"; // React Router v6 import
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "@/lib/queryClient";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import NotFound from "./pages/not-found.jsx";
// // import Home from "@/pages/home.jsx"; // Ensure "home.jsx" exists in "src/pages/"
// import Home from "./pages/Homeddd.jsx"
// function Router() {
//   return (
//     <>
//     <h1>hello</h1>
//     <Routes>
//       <Route path="/" element={<Home />} /> {/* Corrected to use element */}
//       <Route path="*" element={<NotFound />} /> {/* For 404 Page */}
//     </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Router />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;